import Stripe from "stripe";
import dotenv from "dotenv";
import prisma from "../prismaClient.js";
import { generateTicketNumber } from "../utils/generateTicketNumber.js";
import { sendTicketEmail } from "../utils/emailService.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export const createCheckoutSession = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Not authenticated" });
    }
   if (req.user.role === "seller") {
      return res.status(403).json({
        message: "Seller accounts cannot be used to purchase tickets.",
      });
    }
    const { eventId, quantity = 1 } = req.body;
    const qty = parseInt(quantity, 10);

    if (!eventId || isNaN(qty) || qty < 1) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const unitAmount = Math.round(Number(event.price) * 100);

    const clientUrl = req.headers.origin || process.env.CLIENT_URL;

    const successUrl =
      `${clientUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}&payment_session=true`;
    const cancelUrl =
      `${clientUrl}/payment/failed?payment_session=true`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: event.title },
            unit_amount: unitAmount,
          },
          quantity: qty,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        eventId,
        quantity: qty.toString(),
        userId: req.user.id,
      },
    });

    return res.json({ url: session.url });
  } catch (err) {
    console.error("createCheckoutSession error:", err);
    return res.status(500).json({ message: "Failed to create checkout session" });
  }
};

export const verifyCheckoutSession = async (req, res) => {
  const { sessionId } = req.query;

  if (!sessionId) {
    return res.status(400).json({ success: false });
  }

  try {
    // 1. Check if we already fulfilled this session (e.g. webhook beat us to it)
    const existingTicket = await prisma.ticket.findFirst({
      where: { stripeSessionId: sessionId },
    });

    if (existingTicket) {
      return res.json({ success: true });
    }

    // 2. Fetch the session directly from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const { eventId, userId, quantity } = session.metadata;
      const qty = parseInt(quantity, 10);

      // 3. Fulfill tickets in a transaction
      const createdTickets = await prisma.$transaction(async (tx) => {
        // Double check existence inside transaction to avoid race conditions
        const txExisting = await tx.ticket.findFirst({
          where: { stripeSessionId: session.id },
        });
        if (txExisting) return null;

        const updated = await tx.event.updateMany({
          where: {
            id: eventId,
            capacity: { gte: qty },
          },
          data: {
            capacity: { decrement: qty },
            ticketsSold: { increment: qty },
          },
        });
        
        if (updated.count === 0) {
          throw new Error("NOT_ENOUGH_TICKETS");
        }

        const ev = await tx.event.findUnique({ where: { id: eventId } });
        const ticketPromises = [];
        for (let i = 0; i < qty; i++) {
          ticketPromises.push(
            tx.ticket.create({
              data: {
                userId,
                eventId,
                eventName: ev.title,
                eventDate: ev.date,
                unitPrice: ev.price,
                quantity: 1,
                totalPrice: ev.price,
                stripeSessionId: session.id,
                ticketNumber: generateTicketNumber(),
                status: "CONFIRMED",
                purchaseDate: new Date(),
              },
            })
          );
        }
        const tickets = await Promise.all(ticketPromises);
        return { tickets, event: ev };
      });

      if (createdTickets) {
        // Send email
        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: { email: true, name: true },
        });
        if (user && user.email) {
          await sendTicketEmail(
            user.email,
            user.name,
            createdTickets.tickets,
            createdTickets.event
          );
        }
      }

      return res.json({ success: true });
    }

    // If not paid
    return res.json({
      success: false,
      reason: "PAYMENT_NOT_COMPLETED",
    });

  } catch (error) {
    console.error("verifyCheckoutSession error:", error);
    return res.json({
      success: false,
      reason: "VERIFICATION_ERROR",
    });
  }
};