import React from "react";
import { ShoppingBag, CalendarPlus, Ticket, User, Star, ArrowRight } from "lucide-react";
import Logo from "../components/logo/Logo.jsx";
import heroImage from "../assets/image.jpg";

const LandingPage = () => {
  return (
    <div className="font-sans min-h-screen flex flex-col bg-slate-50">

      {/* Navbar */}
      <header className="flex justify-between items-center px-4 sm:px-8 py-3 bg-white/80 backdrop-blur-lg border-b border-slate-200/60 sticky top-0 z-50 shadow-sm">
        <div className="shrink-0 cursor-pointer">
          <Logo />
        </div>
        <nav className="flex items-center">
          <a href="/buyer/login" className="flex items-center gap-1.5 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg btn-glow transition-all">
            Get Started <ArrowRight size={14} />
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center text-center text-white py-28 sm:py-40 px-4 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url(" + heroImage + ")" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl px-2">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            The #1 Event Platform
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold mb-5 leading-tight tracking-tight">
            Amazing Events,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Amazing Audience
            </span>
          </h1>

          <p className="text-base sm:text-xl text-white/80 mb-10 max-w-xl mx-auto leading-relaxed">
            EventConnect makes it effortless to discover, book, and host amazing events all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/buyer/login"
              className="px-7 py-3.5 bg-white text-indigo-700 font-bold rounded-xl shadow-lg hover:bg-indigo-50 inline-flex items-center justify-center gap-2 transition-all duration-200 btn-glow text-sm sm:text-base"
            >
              <ShoppingBag size={18} /> Buy Tickets
            </a>
            <a
              href="/seller/login"
              className="px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg inline-flex items-center justify-center gap-2 transition-all duration-200 border border-indigo-400 text-sm sm:text-base"
            >
              <CalendarPlus size={18} /> Host an Event
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <main className="flex-grow bg-slate-50">
        <section className="py-16 sm:py-24 px-6 sm:px-10 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-3">
              Everything You <span className="gradient-text">Need</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto">
              From discovering local events to managing thousands of attendees — we have got you covered.
            </p>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            <div className="group p-7 rounded-2xl bg-white border border-slate-100 shadow-sm card-hover cursor-default">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-5 group-hover:bg-indigo-600 transition-colors duration-300">
                <Ticket className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-bold text-lg text-slate-800 mb-2">Easy Ticketing</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Buy and book tickets for any event with just a few clicks. Instant confirmation every time.
              </p>
            </div>

            <div className="group p-7 rounded-2xl bg-white border border-slate-100 shadow-sm card-hover cursor-default">
              <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mb-5 group-hover:bg-violet-600 transition-colors duration-300">
                <CalendarPlus className="w-6 h-6 text-violet-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-bold text-lg text-slate-800 mb-2">For Organizers</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Create and manage your events, track sales, and send tickets — all from one dashboard.
              </p>
            </div>

            <div className="group p-7 rounded-2xl bg-white border border-slate-100 shadow-sm card-hover cursor-default sm:col-span-2 md:col-span-1">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-5 group-hover:bg-purple-600 transition-colors duration-300">
                <User className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-bold text-lg text-slate-800 mb-2">For Attendees</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Discover events near you. Filter by category, browse details, and book instantly.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-5 text-center text-slate-400 text-xs sm:text-sm">
        © {new Date().getFullYear()} <span className="font-semibold text-slate-600">EventConnect</span>. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
