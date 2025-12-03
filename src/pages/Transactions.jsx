import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Wallet, TrendingUp, Trash2, Moon, Sun, Plus } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

const Transactions = ({ transactions, setTransactions, fetchTransactions, darkMode, setDarkMode }) => {
  const location = useLocation();
  const [newTx, setNewTx] = useState({
    title: '',
    amount: '',
    category: 'work',
    type: 'income'
  });

  useEffect(() => {
    if (location.state?.type) {
      setNewTx(prev => ({ ...prev, type: location.state.type }));
    }
  }, [location.state]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newTx.title || !newTx.amount) return;

    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          ...newTx,
          amount: parseFloat(newTx.amount),
          date: new Date().toISOString().split('T')[0]
        })
      });

      if (response.ok) {
        setNewTx({ title: '', amount: '', category: 'work', type: 'expense' });
        fetchTransactions();
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const deleteTx = async (id) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) return;

    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/transactions/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': token }
      });

      if (response.ok) {
        fetchTransactions();
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 p-6 ${darkMode
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
        }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2
            className={`text-3xl font-bold bg-gradient-to-r ${darkMode
              ? 'from-purple-400 via-pink-400 to-blue-400'
              : 'from-purple-600 via-pink-600 to-blue-600'
              } bg-clip-text text-transparent`}
          >
            Transactions
          </h2>
          <p className={`${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Manage your expenses and income.
          </p>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-4 rounded-2xl transition-all duration-300 hover:scale-110 ${darkMode
            ? 'bg-slate-800/60 text-yellow-400'
            : 'bg-white/80 text-slate-700 shadow-lg'
            } backdrop-blur-sm`}
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Transaction Form */}
        <div>
          <div
            className={`rounded-3xl p-6 transition-all backdrop-blur-sm ${darkMode
              ? 'bg-slate-800/40 border border-slate-700/50'
              : 'bg-white/80 shadow-xl'
              }`}
          >
            <h3
              className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-800'
                }`}
            >
              Add New
            </h3>

            <form onSubmit={handleAdd} className="space-y-4">
              {/* Description */}
              <div>
                <label
                  className={`block text-xs mb-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}
                >
                  Description
                </label>
                <input
                  type="text"
                  value={newTx.title}
                  onChange={(e) =>
                    setNewTx({ ...newTx, title: e.target.value })
                  }
                  className={`w-full p-3 rounded-xl bg-slate-50 focus:ring-2 ${darkMode
                    ? 'bg-slate-700/30 text-white border border-slate-600 focus:ring-purple-500'
                    : 'border border-slate-200 focus:ring-purple-500'
                    }`}
                  placeholder="e.g. Grocery Shopping"
                />
              </div>

              {/* Amount */}
              <div>
                <label
                  className={`block text-xs mb-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}
                >
                  Amount
                </label>
                <div className="relative">
                  <span
                    className={`absolute left-4 top-3 ${darkMode ? 'text-slate-400' : 'text-slate-400'
                      }`}
                  >
                    ₹
                  </span>
                  <input
                    type="number"
                    value={newTx.amount}
                    onChange={(e) =>
                      setNewTx({ ...newTx, amount: e.target.value })
                    }
                    className={`w-full p-3 pl-8 rounded-xl focus:ring-2 ${darkMode
                      ? 'bg-slate-700/30 text-white border border-slate-600 focus:ring-purple-500'
                      : 'bg-slate-50 border border-slate-200 focus:ring-purple-500'
                      }`}
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Type + Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className={`block text-xs mb-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'
                      }`}
                  >
                    Type
                  </label>
                  <select
                    value={newTx.type}
                    onChange={(e) =>
                      setNewTx({ ...newTx, type: e.target.value })
                    }
                    className={`w-full p-3 rounded-xl ${darkMode
                      ? 'bg-slate-700/30 text-white border border-slate-600'
                      : 'bg-slate-50 border border-slate-200'
                      }`}
                  >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </div>

                <div>
                  <label
                    className={`block text-xs mb-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'
                      }`}
                  >
                    Category
                  </label>
                  <select
                    value={newTx.category}
                    onChange={(e) =>
                      setNewTx({ ...newTx, category: e.target.value })
                    }
                    className={`w-full p-3 rounded-xl ${darkMode
                      ? 'bg-slate-700/30 text-white border border-slate-600'
                      : 'bg-slate-50 border border-slate-200'
                      }`}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg"
              >
                Add Transaction
              </button>
            </form>
          </div>
        </div>

        {/* Transaction List */}
        <div className="lg:col-span-2 space-y-4">
          {transactions.map((t) => {
            const cat = CATEGORIES.find((c) => c.id === t.category);

            return (
              <div
                key={t._id}
                className={`rounded-3xl p-4 flex items-center justify-between transition-all hover:scale-[1.02] backdrop-blur-sm ${darkMode
                  ? 'bg-slate-700/30 border border-slate-700/50'
                  : 'bg-white/80 shadow-md'
                  }`}
              >
                {/* Left */}
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${t.type === 'income'
                      ? darkMode
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-emerald-100 text-emerald-600'
                      : darkMode
                        ? 'bg-rose-500/20 text-rose-400'
                        : 'bg-slate-100 text-slate-600'
                      }`}
                  >
                    {t.type === 'income' ? (
                      <TrendingUp size={20} />
                    ) : (
                      <Wallet size={20} />
                    )}
                  </div>

                  <div>
                    <h4
                      className={`font-bold ${darkMode ? 'text-white' : 'text-slate-800'
                        }`}
                    >
                      {t.title}
                    </h4>

                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${cat.color
                          }`}
                      >
                        {cat.name}
                      </span>
                      <span
                        className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'
                          }`}
                      >
                        {t.date}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-6">
                  <span
                    className={`text-lg font-bold ${t.type === 'income'
                      ? darkMode
                        ? 'text-emerald-400'
                        : 'text-emerald-600'
                      : darkMode
                        ? 'text-white'
                        : 'text-slate-700'
                      }`}
                  >
                    {t.type === 'income' ? '+' : '-'}₹{t.amount.toFixed(2)}
                  </span>

                  <button
                    onClick={() => deleteTx(t._id)}
                    className={`p-2 rounded-xl transition-colors ${darkMode
                      ? 'text-slate-500 hover:text-red-400'
                      : 'text-slate-300 hover:text-red-500'
                      }`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
