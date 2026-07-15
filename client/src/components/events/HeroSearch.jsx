import React from "react";
import { Search, Sparkles } from "lucide-react";
import HeroImg from "../../assets/hero-bg.jpg";

export default function HeroSearch({ value = "", onChange, onSearch }) {
  return (
    <section
      className="relative bg-cover bg-center text-white py-20 md:py-28 px-4 overflow-hidden"
      style={{
        backgroundImage: "url(" + HeroImg + ")",
        backgroundColor: "rgba(0,0,0,0.6)",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Glow overlays */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900/40 to-purple-900/30 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-indigo-500/20 blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
          <Sparkles size={12} className="text-yellow-400" />
          Discover What's Happening
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold mb-8 leading-tight tracking-tight">
          Find Events For{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
            Everything You Love
          </span>
        </h1>

        {/* Search bar */}
        <div className="bg-white rounded-2xl flex items-center p-2 shadow-2xl max-w-2xl mx-auto gap-2">
          <div className="flex items-center flex-1 px-3">
            <Search className="text-slate-400 w-5 h-5 shrink-0" />
            <input
              type="text"
              placeholder="Search events, artists, venues..."
              value={value}
              onChange={(e) => onChange && onChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && onSearch) onSearch();
              }}
              className="outline-none w-full ml-3 text-slate-800 text-sm sm:text-base placeholder-slate-400 bg-transparent"
            />
          </div>

          <button
            onClick={() => onSearch && onSearch()}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl text-sm sm:text-base transition-all btn-glow"
          >
            <Search size={15} />
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
