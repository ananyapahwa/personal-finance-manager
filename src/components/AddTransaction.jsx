import React, { useState, useEffect } from "react";

export function AddTransaction({
  type,
  setType,
  category,
  setCategory,
  amount,
  setAmount,
  desc,
  setDesc,
  addTransaction
}) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  return (
    <div
      className={`rounded-3xl p-6 transition-all backdrop-blur-xl max-w-xl ${darkMode
          ? "bg-slate-800/40 border border-slate-700/50"
          : "bg-white/90 shadow-xl"
        }`}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2
          className={`text-2xl font-bold bg-gradient-to-r ${darkMode
              ? "from-purple-400 via-pink-400 to-blue-400"
              : "from-purple-600 via-pink-600 to-blue-600"
            } bg-clip-text text-transparent`}
        >
          Add Transaction
        </h2>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-3 py-2 rounded-xl transition-all ${darkMode
              ? "bg-slate-700/50 text-yellow-400"
              : "bg-white/80 text-slate-700 shadow-md"
            }`}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      {/* FORM */}
      <div className="grid gap-4">
        {/* TYPE */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className={`p-3 rounded-xl transition-all ${darkMode
              ? "bg-slate-700/30 border border-slate-600 text-white"
              : "bg-slate-50 border border-slate-200"
            }`}
        >
          <option value="expense">Expense</option>
          <option value="saving">Saving</option>
        </select>

        {/* CATEGORY */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`p-3 rounded-xl transition-all ${darkMode
              ? "bg-slate-700/30 border border-slate-600 text-white"
              : "bg-slate-50 border border-slate-200"
            }`}
        >
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Health</option>
          <option>Work</option>
          <option>Other</option>
        </select>

        {/* AMOUNT */}
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className={`p-3 rounded-xl transition-all ${darkMode
              ? "bg-slate-700/30 border border-slate-600 text-white"
              : "bg-slate-50 border border-slate-200"
            }`}
        />

        {/* DESCRIPTION */}
        <input
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description"
          className={`p-3 rounded-xl transition-all ${darkMode
              ? "bg-slate-700/30 border border-slate-600 text-white"
              : "bg-slate-50 border border-slate-200"
            }`}
        />

        {/* BUTTON */}
        <button
          onClick={addTransaction}
          className="w-full py-3 rounded-xl text-white font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:opacity-90 transition-all shadow-lg"
        >
          Add
        </button>
      </div>
    </div>
  );
}
