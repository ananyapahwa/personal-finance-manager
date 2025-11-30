import React, { useState } from 'react';
import { Plus, TrendingUp, Sun, Moon, Target, Sparkles, X, Trash2 } from 'lucide-react';

const Savings = ({ savings, setSavings, darkMode, setDarkMode }) => {
  const [showModal, setShowModal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: '',
    target: '',
    icon: '💰',
    color: 'emerald'
  });
  const [customModal, setCustomModal] = useState({ isOpen: false, goalId: null, amount: '' });

  const fetchGoals = async () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:5000/api/goals', {
        headers: { 'Authorization': token },
      });
      if (response.ok) {
        const data = await response.json();
        setSavings(data);
      }
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const addCapital = async (id, amount) => {
    const goal = savings.find(s => s._id === id);
    if (!goal) return;

    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/goals/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ current: goal.current + amount })
      });

      if (response.ok) {
        fetchGoals();
      }
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  const deleteGoal = async (id) => {
    if (!window.confirm('Are you sure you want to delete this goal?')) return;

    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/goals/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': token }
      });

      if (response.ok) {
        fetchGoals();
      }
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const handleCreateGoal = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5000/api/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(newGoal)
      });

      if (response.ok) {
        setShowModal(false);
        setNewGoal({ name: '', target: '', icon: '💰', color: 'emerald' });
        fetchGoals();
      }
    } catch (error) {
      console.error('Error creating goal:', error);
    }
  };

  const handleCustomAmountSubmit = (e) => {
    e.preventDefault();
    if (customModal.goalId && customModal.amount) {
      addCapital(customModal.goalId, Number(customModal.amount));
      setCustomModal({ isOpen: false, goalId: null, amount: '' });
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 p-6 lg:p-8 ${darkMode
        ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
        : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
        }`}
    >
      {/* HEADER */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 animate-fade-in">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-xl ${darkMode ? 'bg-purple-500/20' : 'bg-gradient-to-r from-purple-500 to-pink-500'} backdrop-blur-sm`}>
              <Target className={darkMode ? 'text-purple-400' : 'text-white'} size={24} />
            </div>
            <h2
              className={`text-3xl lg:text-4xl font-bold bg-gradient-to-r ${darkMode
                ? "from-purple-400 via-pink-400 to-blue-400"
                : "from-purple-600 via-pink-600 to-blue-600"
                } bg-clip-text text-transparent`}
            >
              Savings Goals
            </h2>
          </div>
          <p className={`ml-14 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
            Track your progress toward financial freedom ✨
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowModal(true)}
            className={`px-5 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105 ${darkMode
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30"
              : "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/20"
              }`}
          >
            <Plus size={18} /> New Goal
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-2xl transition-all duration-300 hover:scale-110 ${darkMode
              ? "bg-slate-800/50 text-yellow-400 hover:bg-slate-800/70"
              : "bg-white/80 shadow-lg text-slate-700 hover:bg-white"
              } backdrop-blur-sm`}
          >
            {darkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>
        </div>
      </header>

      {/* SUMMARY STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className={`rounded-3xl p-6 transition-all duration-300 hover:scale-105 ${darkMode
          ? 'bg-slate-800/40 border border-slate-700/50'
          : 'bg-white/80 shadow-xl'
          } backdrop-blur-lg`}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${darkMode ? 'bg-emerald-500/20' : 'bg-emerald-100'
              }`}>
              <Target className={darkMode ? 'text-emerald-400' : 'text-emerald-600'} size={20} />
            </div>
            <p className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Total Goals
            </p>
          </div>
          <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
            {savings.length}
          </h3>
        </div>

        <div className={`rounded-3xl p-6 transition-all duration-300 hover:scale-105 ${darkMode
          ? 'bg-slate-800/40 border border-slate-700/50'
          : 'bg-white/80 shadow-xl'
          } backdrop-blur-lg`}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${darkMode ? 'bg-blue-500/20' : 'bg-blue-100'
              }`}>
              <Sparkles className={darkMode ? 'text-blue-400' : 'text-blue-600'} size={20} />
            </div>
            <p className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Total Saved
            </p>
          </div>
          <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
            ${savings.reduce((sum, g) => sum + g.current, 0).toLocaleString()}
          </h3>
        </div>

        <div className={`rounded-3xl p-6 transition-all duration-300 hover:scale-105 ${darkMode
          ? 'bg-slate-800/40 border border-slate-700/50'
          : 'bg-white/80 shadow-xl'
          } backdrop-blur-lg`}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${darkMode ? 'bg-purple-500/20' : 'bg-purple-100'
              }`}>
              <TrendingUp className={darkMode ? 'text-purple-400' : 'text-purple-600'} size={20} />
            </div>
            <p className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Total Target
            </p>
          </div>
          <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
            ${savings.reduce((sum, g) => sum + g.target, 0).toLocaleString()}
          </h3>
        </div>
      </div>

      {/* SAVINGS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savings.map((goal, index) => {
          const percentage = Math.min((goal.current / goal.target) * 100, 100);
          const isComplete = percentage >= 100;

          return (
            <div
              key={goal._id}
              className={`rounded-3xl p-6 backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl group relative ${darkMode
                ? "bg-slate-800/40 border border-slate-700/50"
                : "bg-white/80 shadow-xl"
                }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Delete Button */}
              <button
                onClick={() => deleteGoal(goal._id)}
                className={`absolute top-4 right-4 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${darkMode ? 'hover:bg-slate-700 text-slate-400 hover:text-red-400' : 'hover:bg-slate-100 text-slate-400 hover:text-red-500'
                  }`}
              >
                <Trash2 size={18} />
              </button>

              {/* ICON + PERCENTAGE BADGE */}
              <div className="flex justify-between items-start mb-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-transform group-hover:scale-110 ${darkMode ? 'bg-slate-700/50' : 'bg-slate-100'
                  }`}>
                  {goal.icon}
                </div>

                <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${isComplete
                  ? darkMode
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-emerald-100 text-emerald-600'
                  : darkMode
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-blue-100 text-blue-600'
                  }`}>
                  {isComplete ? '✓ ' : ''}{Math.round(percentage)}%
                </div>
              </div>

              {/* NAME */}
              <h3
                className={`font-bold text-xl mb-2 ${darkMode ? "text-white" : "text-slate-800"
                  }`}
              >
                {goal.name}
              </h3>

              {/* PROGRESS NUMBERS */}
              <div className="flex justify-between items-baseline mb-4">
                <div>
                  <p className={`text-xs ${darkMode ? "text-slate-500" : "text-slate-400"} mb-1`}>
                    Current
                  </p>
                  <p
                    className={`text-2xl font-bold ${darkMode ? "text-emerald-400" : "text-emerald-600"
                      }`}
                  >
                    ${goal.current.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-xs ${darkMode ? "text-slate-500" : "text-slate-400"} mb-1`}>
                    Target
                  </p>
                  <p className={`text-lg font-semibold ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                    ${goal.target.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* PROGRESS BAR */}
              <div
                className={`h-3 w-full rounded-full overflow-hidden mb-5 ${darkMode ? "bg-slate-700/50" : "bg-slate-200"
                  }`}
              >
                <div
                  className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full transition-all duration-700 relative overflow-hidden"
                  style={{ width: `${percentage}%` }}
                >
                  <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-2">
                <button
                  onClick={() => addCapital(goal._id, 100)}
                  className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 ${darkMode
                    ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-white hover:from-purple-500/30 hover:to-pink-500/30"
                    : "bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 text-purple-700 hover:from-purple-200 hover:to-pink-200"
                    }`}
                >
                  Add $100
                </button>
                <button
                  onClick={() => addCapital(goal._id, 500)}
                  className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 ${darkMode
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30"
                    : "bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-lg shadow-emerald-500/20"
                    }`}
                >
                  Add $500
                </button>
                <button
                  onClick={() => setCustomModal({ isOpen: true, goalId: goal._id, amount: '' })}
                  className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 ${darkMode
                    ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                >
                  Custom
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* NEW GOAL MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className={`w-full max-w-md rounded-3xl p-8 shadow-2xl ${darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white'}`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>New Goal</h3>
              <button onClick={() => setShowModal(false)} className={`p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleCreateGoal} className="space-y-4">
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Goal Name</label>
                <input
                  type="text"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                  className={`w-full p-4 rounded-xl outline-none transition-all ${darkMode ? 'bg-slate-800 text-white border border-slate-700 focus:border-purple-500' : 'bg-slate-50 text-slate-900 border border-slate-200 focus:border-purple-500'}`}
                  placeholder="e.g. New Car"
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Target Amount</label>
                <input
                  type="number"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                  className={`w-full p-4 rounded-xl outline-none transition-all ${darkMode ? 'bg-slate-800 text-white border border-slate-700 focus:border-purple-500' : 'bg-slate-50 text-slate-900 border border-slate-200 focus:border-purple-500'}`}
                  placeholder="e.g. 5000"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Icon</label>
                  <select
                    value={newGoal.icon}
                    onChange={(e) => setNewGoal({ ...newGoal, icon: e.target.value })}
                    className={`w-full p-4 rounded-xl outline-none transition-all ${darkMode ? 'bg-slate-800 text-white border border-slate-700 focus:border-purple-500' : 'bg-slate-50 text-slate-900 border border-slate-200 focus:border-purple-500'}`}
                  >
                    <option value="💰">💰 Money</option>
                    <option value="🚗">🚗 Car</option>
                    <option value="🏠">🏠 House</option>
                    <option value="✈️">✈️ Travel</option>
                    <option value="💻">💻 Tech</option>
                    <option value="🎓">🎓 Education</option>
                    <option value="🛡️">🛡️ Emergency</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Color</label>
                  <select
                    value={newGoal.color}
                    onChange={(e) => setNewGoal({ ...newGoal, color: e.target.value })}
                    className={`w-full p-4 rounded-xl outline-none transition-all ${darkMode ? 'bg-slate-800 text-white border border-slate-700 focus:border-purple-500' : 'bg-slate-50 text-slate-900 border border-slate-200 focus:border-purple-500'}`}
                  >
                    <option value="emerald">Emerald</option>
                    <option value="blue">Blue</option>
                    <option value="purple">Purple</option>
                    <option value="pink">Pink</option>
                    <option value="orange">Orange</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
              >
                Create Goal
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CUSTOM AMOUNT MODAL */}
      {customModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className={`w-full max-w-sm rounded-3xl p-8 shadow-2xl ${darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white'}`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Add Custom Amount</h3>
              <button
                onClick={() => setCustomModal({ isOpen: false, goalId: null, amount: '' })}
                className={`p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleCustomAmountSubmit} className="space-y-4">
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Amount</label>
                <input
                  type="number"
                  value={customModal.amount}
                  onChange={(e) => setCustomModal({ ...customModal, amount: e.target.value })}
                  className={`w-full p-4 rounded-xl outline-none transition-all ${darkMode ? 'bg-slate-800 text-white border border-slate-700 focus:border-purple-500' : 'bg-slate-50 text-slate-900 border border-slate-200 focus:border-purple-500'}`}
                  placeholder="e.g. 250"
                  required
                  autoFocus
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 mt-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
              >
                Add Funds
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Savings;