import React, { useState, useEffect } from "react";

export function TransactionList({ transactions }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  return (
    <div
      className={`rounded-3xl p-6 transition-all backdrop-blur-xl ${
        darkMode
          ? "bg-slate-800/40 border border-slate-700/50"
          : "bg-white/80 shadow-xl"
      } max-w-3xl`}
    >
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h2
          className={`text-2xl font-bold bg-gradient-to-r ${
            darkMode
              ? "from-purple-400 via-pink-400 to-blue-400"
              : "from-purple-600 via-pink-600 to-blue-600"
          } bg-clip-text text-transparent`}
        >
          All Transactions
        </h2>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-3 py-2 rounded-xl transition-all ${
            darkMode
              ? "bg-slate-700/50 text-yellow-400"
              : "bg-white/80 text-slate-700 shadow-md"
          }`}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      {/* List */}
      <div className="grid gap-4">
        {transactions.map((t, i) => (
          <div
            key={t.id}
            className={`p-4 rounded-2xl flex items-center justify-between transition-all hover:scale-[1.02] backdrop-blur-sm ${
              darkMode
                ? "bg-slate-700/40 border border-slate-600/50"
                : "bg-white/70 shadow-sm"
            }`}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div>
              <p
                className={`font-semibold ${
                  darkMode ? "text-white" : "text-slate-800"
                }`}
              >
                {t.category}{" "}
                <span
                  className={`ml-1 text-xs px-2 py-0.5 rounded-full ${
                    t.type === "income"
                      ? "bg-emerald-500/20 text-emerald-600"
                      : "bg-rose-500/20 text-rose-600"
                  }`}
                >
                  {t.type}
                </span>
              </p>

              <p className={`${darkMode ? "text-slate-300" : "text-slate-600"}`}>
                {t.desc}
              </p>

              <p
                className={`text-xs mt-1 ${
                  darkMode ? "text-slate-500" : "text-slate-500"
                }`}
              >
                {t.date}
              </p>
            </div>

            <p
              className={`text-lg font-bold ${
                t.type === "income"
                  ? darkMode
                    ? "text-emerald-400"
                    : "text-emerald-600"
                  : darkMode
                  ? "text-white"
                  : "text-slate-800"
              }`}
            >
              ₹{t.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
