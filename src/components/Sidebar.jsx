import React from "react";
import {
  LayoutDashboard,
  Wallet,
  PiggyBank,
  Users,
  IndianRupee,
  Sparkles,
  TrendingUp,
  LogOut,
} from "lucide-react";

import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen, darkMode, toggleTheme, onLogout, transactions = [], savings = [] }) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "transactions", label: "Transactions", icon: Wallet },
    { id: "savings", label: "Savings Goals", icon: PiggyBank },
    { id: "split", label: "Split Bill", icon: Users },
  ];

  return (
    <>
      {/* MOBILE BACKDROP */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-20 transition-opacity duration-300 lg:hidden
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setIsOpen(false)}
      />

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30 w-80 px-4 py-6
          transition-transform duration-300 ease-in-out backdrop-blur-xl shadow-2xl border-r
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}

          bg-gradient-to-br
          from-blue-50 via-purple-50 to-pink-50 border-purple-300/40
          dark:from-slate-900 dark:via-purple-900/40 dark:to-slate-900 dark:border-purple-500/20
        `}
      >
        {/* LOGO HEADER */}
        <div
          className="
            p-5 mb-6 rounded-3xl relative overflow-hidden
            bg-gradient-to-r from-purple-200/50 to-pink-100/40
            dark:bg-gradient-to-r dark:from-purple-900/40 dark:to-slate-900/40
          "
        >
          {/* GLOW ORB */}
          <div className="absolute -right-10 -top-10 w-28 h-28 rounded-full blur-3xl bg-purple-300/30 dark:bg-purple-500/20" />

          {/* LOGO */}
          <div className="relative flex items-center gap-2 z-10">
            <div
              className="
                w-10 h-10 rounded-xl flex items-center justify-center
                bg-gradient-to-br from-emerald-400 to-teal-500 shadow-xl
                dark:from-emerald-500 dark:to-teal-500 dark:shadow-emerald-500/40
              "
            >
              <IndianRupee size={20} className="text-white" />
            </div>

            <div>
              <h1
                className="
                  text-lg font-bold bg-gradient-to-r bg-clip-text text-transparent
                  from-emerald-700 to-teal-600
                  dark:from-emerald-400 dark:to-teal-300
                  tracking-tight whitespace-normal leading-tight
                "
              >
                Paisa Portfolio
              </h1>
              <p className="text-slate-700 dark:text-slate-400 text-sm mt-1">
                Financial Manager
              </p>
            </div>
          </div>
        </div>

        {/* MENU */}
        <nav className="space-y-3">
          {menuItems.map((item) => {
            const ActiveIcon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                  navigate(`/${item.id}`);
                }}
                className={`
                  w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all relative overflow-hidden group

                  ${activeTab === item.id
                    ? `
                        bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-white shadow-xl
                        dark:from-purple-500 dark:via-pink-500 dark:to-blue-500
                      `
                    : `
                        text-slate-700 hover:bg-white/60 hover:text-slate-900 shadow-sm
                        dark:text-slate-300 dark:hover:bg-slate-800/50 dark:hover:text-white
                      `
                  }
                `}
              >
                {/* SHIMMER ON ACTIVE */}
                {activeTab === item.id && (
                  <>
                    <div className="absolute inset-0 bg-white/10 animate-shimmer" />
                    <div className="absolute inset-0 blur-xl bg-purple-300/20 dark:bg-purple-500/20" />
                  </>
                )}

                <ActiveIcon
                  size={22}
                  className="relative z-10 group-hover:scale-110 transition-transform"
                />

                <span className="relative z-10 font-semibold text-base">
                  {item.label}
                </span>

                {activeTab === item.id && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-white animate-pulse relative z-10" />
                )}
              </button>
            );
          })}



          <button
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all relative overflow-hidden group text-slate-700 hover:bg-red-50 hover:text-red-600 shadow-sm dark:text-slate-300 dark:hover:bg-red-900/20 dark:hover:text-red-400 mt-8"
          >
            <LogOut
              size={22}
              className="relative z-10 group-hover:scale-110 transition-transform"
            />
            <span className="relative z-10 font-semibold text-base">
              Log Out
            </span>
          </button>
        </nav>

        {/* BOTTOM BALANCE CARD */}
        <div className="absolute bottom-0 left-0 w-full p-5">
          <div
            className="
              rounded-3xl p-6 relative overflow-hidden group
              bg-gradient-to-br from-purple-200/60 via-pink-200/60 to-blue-200/60 border border-purple-300/40
              dark:bg-gradient-to-br dark:from-purple-500/20 dark:via-pink-500/20 dark:to-blue-500/20 dark:border-purple-500/30
              backdrop-blur-md shadow-xl transition-all hover:scale-105
            "
          >
            {/* Decorative glow */}
            <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl bg-purple-300/40 dark:bg-purple-500/20" />
            <div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full blur-2xl bg-pink-300/40 dark:bg-pink-500/20" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles
                  size={16}
                  className="text-purple-700 dark:text-purple-300"
                />
                <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                  Total Savings
                </span>
              </div>

              <p className="text-3xl font-bold text-slate-800 dark:text-white">
                ₹{savings.reduce((acc, goal) => acc + goal.current, 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>

              <div className="flex items-center gap-1 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                <TrendingUp size={14} /> +12.5% this month
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* SHIMMER ANIMATION */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.8s infinite linear;
        }
      `}</style>
    </>
  );
};

export default Sidebar;
