import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, CalendarDays, Ticket } from "lucide-react";

export default function EventCard({ event }) {
  const navigate = useNavigate();
  const { title, date, location, image, price, id } = event;

  const formattedDate = date
    ? new Date(date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm card-hover cursor-pointer"
      onClick={() => navigate("/events/" + id)}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={image || "/assets/sample-event.jpg"}
          alt={title || "Event"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Price badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-indigo-700 font-bold text-xs px-3 py-1 rounded-full shadow">
          {price != null && price > 0 ? "₹" + price : "Free"}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-base font-bold text-slate-800 leading-snug line-clamp-2 mb-3">
          {title || "Untitled Event"}
        </h3>

        <div className="flex flex-col gap-1.5 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <MapPin size={12} className="text-indigo-400 shrink-0" />
            <span className="truncate">{location || "TBD"}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <CalendarDays size={12} className="text-indigo-400 shrink-0" />
            <span>{formattedDate}</span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate("/events/" + id);
          }}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2.5 rounded-xl btn-glow transition-all duration-200"
        >
          <Ticket size={14} />
          Book Ticket
        </button>
      </div>
    </div>
  );
}
