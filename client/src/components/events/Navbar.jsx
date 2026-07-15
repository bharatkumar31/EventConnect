import React, { useState } from "react";
import { CalendarDays, PlusCircle, Menu, X, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../logo/Logo";
import axios from "../../utils/axiosInstance.js";
import { useToast } from "../../context/ToastContext.jsx";
import profileIcon from "../../assets/profile.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const goToProfile = () => {
    setProfileOpen(false);
    navigate("/profile");
  };

  const handleLogout = async () => {
    try { await axios.post("/seller/logout", {}, { withCredentials: true }); } catch {}
    try { await axios.post("/logout", {}, { withCredentials: true }); } catch {}
    showToast?.("Logged out successfully!", "success");
    setProfileOpen(false);
    navigate("/");
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-slate-200/60 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center h-[60px]">

        <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
          <Logo />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="/events"
            className="flex items-center gap-1.5 text-slate-600 hover:text-indigo-600 font-medium text-sm transition-colors duration-200"
          >
            <CalendarDays size={15} />
            Explore Events
          </a>

          <button
            onClick={() => navigate("/events/create")}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg btn-glow transition-all duration-200"
          >
            <PlusCircle size={15} />
            Create Event
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen((s) => !s)}
              className="w-9 h-9 rounded-full ring-2 ring-indigo-200 hover:ring-indigo-400 transition-all duration-200 overflow-hidden"
            >
              <img src={profileIcon} alt="Profile" className="w-full h-full object-cover" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-100 rounded-xl shadow-xl py-1.5 z-50">
                <button
                  onClick={goToProfile}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                >
                  <User size={14} />
                  My Profile
                </button>
                <div className="h-px bg-slate-100 mx-3 my-1" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-slate-600 hover:text-indigo-600 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-lg">
          <div className="flex flex-col p-4 gap-3">
            <a
              href="/events"
              className="flex items-center gap-2 text-slate-700 hover:text-indigo-600 font-medium text-sm py-2 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <CalendarDays size={16} />
              Explore Events
            </a>

            <button
              onClick={() => { navigate("/events/create"); setMenuOpen(false); }}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
            >
              <PlusCircle size={16} />
              Create Event
            </button>

            <div className="border-t border-slate-100 pt-3 flex flex-col gap-1">
              <button
                onClick={() => { goToProfile(); setMenuOpen(false); }}
                className="flex items-center gap-2 text-slate-700 hover:text-indigo-600 text-sm py-2 px-2 transition-colors"
              >
                <img src={profileIcon} alt="Profile" className="w-6 h-6 rounded-full object-cover ring-1 ring-indigo-200" />
                My Profile
              </button>
              <button
                onClick={() => { handleLogout(); setMenuOpen(false); }}
                className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm py-2 px-2 transition-colors"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}


