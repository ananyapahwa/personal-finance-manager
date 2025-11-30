import React, { useState, useEffect } from 'react';
import { Users, Plus, Sun, Moon, DollarSign, Sparkles, TrendingDown, Calendar } from 'lucide-react';

const SplitBill = ({ darkMode, setDarkMode }) => {
  const [friends, setFriends] = useState(['Me', 'Alice', 'Bob', 'Charlie']);
  const [billAmount, setBillAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [splitHistory, setSplitHistory] = useState([]);

  const toggleFriend = (friend) => {
    if (selectedFriends.includes(friend)) {
      setSelectedFriends(selectedFriends.filter(f => f !== friend));
    } else {
      setSelectedFriends([...selectedFriends, friend]);
    }
  };

  const handleSplit = () => {
    if (!billAmount || selectedFriends.length === 0) return;
    const amountPerPerson = parseFloat(billAmount) / selectedFriends.length;

    const newSplit = {
      id: Date.now(),
      description: description || 'Unspecified Bill',
      total: parseFloat(billAmount),
      people: selectedFriends,
      perPerson: amountPerPerson,
      date: new Date().toLocaleDateString()
    };

    setSplitHistory([newSplit, ...splitHistory]);
    setBillAmount('');
    setDescription('');
    setSelectedFriends([]);
  };

  const totalSplit = splitHistory.reduce((sum, s) => sum + s.total, 0);
  const totalTransactions = splitHistory.length;

  return (
    <div className={`min-h-screen transition-colors duration-500 p-6 lg:p-8 ${darkMode
        ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
        : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
      }`}>
      {/* HEADER */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 animate-fade-in">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-xl ${darkMode ? 'bg-purple-500/20' : 'bg-gradient-to-r from-purple-500 to-pink-500'} backdrop-blur-sm`}>
              <Users className={darkMode ? 'text-purple-400' : 'text-white'} size={24} />
            </div>
            <h2
              className={`text-3xl lg:text-4xl font-bold bg-gradient-to-r ${darkMode
                  ? "from-purple-400 via-pink-400 to-blue-400"
                  : "from-purple-600 via-pink-600 to-blue-600"
                } bg-clip-text text-transparent`}
            >
              Split Bill
            </h2>
          </div>
          <p className={`ml-14 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
            Divide expenses easily among friends ✨
          </p>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-3 rounded-2xl transition-all duration-300 hover:scale-110 ${darkMode
              ? "bg-slate-800/50 text-yellow-400 hover:bg-slate-800/70"
              : "bg-white/80 shadow-lg text-slate-700 hover:bg-white"
            } backdrop-blur-sm`}
        >
          {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        </button>
      </header>

      {/* SUMMARY STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className={`rounded-3xl p-6 transition-all duration-300 hover:scale-105 ${darkMode
            ? 'bg-slate-800/40 border border-slate-700/50'
            : 'bg-white/80 shadow-xl'
          } backdrop-blur-lg`}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${darkMode ? 'bg-blue-500/20' : 'bg-blue-100'
              }`}>
              <TrendingDown className={darkMode ? 'text-blue-400' : 'text-blue-600'} size={20} />
            </div>
            <p className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Total Split
            </p>
          </div>
          <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
            ${totalSplit.toFixed(2)}
          </h3>
        </div>

        <div className={`rounded-3xl p-6 transition-all duration-300 hover:scale-105 ${darkMode
            ? 'bg-slate-800/40 border border-slate-700/50'
            : 'bg-white/80 shadow-xl'
          } backdrop-blur-lg`}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${darkMode ? 'bg-purple-500/20' : 'bg-purple-100'
              }`}>
              <Sparkles className={darkMode ? 'text-purple-400' : 'text-purple-600'} size={20} />
            </div>
            <p className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Transactions
            </p>
          </div>
          <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
            {totalTransactions}
          </h3>
        </div>

        <div className={`rounded-3xl p-6 transition-all duration-300 hover:scale-105 ${darkMode
            ? 'bg-slate-800/40 border border-slate-700/50'
            : 'bg-white/80 shadow-xl'
          } backdrop-blur-lg`}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${darkMode ? 'bg-emerald-500/20' : 'bg-emerald-100'
              }`}>
              <Users className={darkMode ? 'text-emerald-400' : 'text-emerald-600'} size={20} />
            </div>
            <p className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Friends
            </p>
          </div>
          <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
            {friends.length}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* NEW EXPENSE CARD */}
        <div className={`rounded-3xl p-8 backdrop-blur-lg ${darkMode
            ? "bg-slate-800/40 border border-slate-700/50"
            : "bg-white/80 shadow-xl"
          }`}>
          <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
            New Expense
          </h3>

          <div className="space-y-6">
            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Description
              </label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full p-4 rounded-2xl transition-all ${darkMode
                    ? 'bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-purple-500'
                    : 'bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:border-purple-500'
                  } outline-none`}
                placeholder="e.g. Friday Dinner"
              />
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Total Bill Amount
              </label>
              <div className="relative">
                <span className={`absolute left-5 top-5 text-2xl font-bold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  $
                </span>
                <input
                  type="number"
                  value={billAmount}
                  onChange={(e) => setBillAmount(e.target.value)}
                  className={`w-full p-4 pl-12 rounded-2xl text-2xl font-bold transition-all ${darkMode
                      ? 'bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-purple-500'
                      : 'bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:border-purple-500'
                    } outline-none`}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Split With
              </label>
              <div className="flex flex-wrap gap-3">
                {friends.map(friend => (
                  <button
                    key={friend}
                    onClick={() => toggleFriend(friend)}
                    className={`px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${selectedFriends.includes(friend)
                        ? darkMode
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30 scale-105'
                          : 'bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-lg shadow-emerald-500/20 scale-105'
                        : darkMode
                          ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:scale-105'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:scale-105'
                      }`}
                  >
                    {friend}
                  </button>
                ))}
                <button className={`w-12 h-12 rounded-2xl border-2 border-dashed flex items-center justify-center transition-all hover:scale-110 ${darkMode
                    ? 'border-slate-600 text-slate-400 hover:border-slate-500 hover:text-slate-300'
                    : 'border-slate-300 text-slate-400 hover:border-slate-400 hover:text-slate-600'
                  }`}>
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {billAmount && selectedFriends.length > 0 && (
              <div className={`p-5 rounded-2xl transition-all duration-300 animate-fade-in ${darkMode
                  ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30'
                  : 'bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-200'
                }`}>
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-semibold ${darkMode ? 'text-emerald-300' : 'text-emerald-800'}`}>
                    Each person pays
                  </span>
                  <span className={`text-3xl font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    ${(parseFloat(billAmount) / selectedFriends.length).toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={handleSplit}
              disabled={!billAmount || selectedFriends.length === 0}
              className={`w-full py-4 rounded-2xl font-bold transition-all duration-300 ${!billAmount || selectedFriends.length === 0
                  ? 'opacity-50 cursor-not-allowed bg-slate-400 text-white'
                  : darkMode
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 hover:scale-105'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/20 hover:scale-105'
                }`}
            >
              Split Expense
            </button>
          </div>
        </div>

        {/* RECENT SPLITS */}
        <div className="space-y-4">
          <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
            Recent Splits
          </h3>

          {splitHistory.length === 0 ? (
            <div className={`text-center py-16 rounded-3xl border-2 border-dashed transition-all ${darkMode
                ? 'bg-slate-800/20 border-slate-700'
                : 'bg-slate-50 border-slate-200'
              }`}>
              <Users className={`mx-auto mb-4 ${darkMode ? 'text-slate-600' : 'text-slate-300'}`} size={48} />
              <p className={`text-lg font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                No bills split yet
              </p>
              <p className={`text-sm mt-2 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                Create your first split expense
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {splitHistory.map((split, index) => (
                <div
                  key={split.id}
                  className={`rounded-3xl p-6 backdrop-blur-lg transition-all duration-300 hover:scale-102 ${darkMode
                      ? "bg-slate-800/40 border border-slate-700/50"
                      : "bg-white/80 shadow-xl"
                    }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                        {split.description}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar size={14} className={darkMode ? 'text-slate-500' : 'text-slate-400'} />
                        <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          {split.date}
                        </p>
                      </div>
                    </div>
                    <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                      ${split.total.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex -space-x-3 py-3">
                    {split.people.map((p, i) => (
                      <div
                        key={i}
                        className={`inline-flex h-10 w-10 rounded-full ring-4 items-center justify-center text-sm font-bold transition-transform hover:scale-110 ${darkMode
                            ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white ring-slate-800'
                            : 'bg-gradient-to-br from-purple-400 to-pink-400 text-white ring-white'
                          }`}
                        title={p}
                      >
                        {p.charAt(0)}
                      </div>
                    ))}
                  </div>

                  <div className={`mt-4 pt-4 border-t flex justify-between items-center ${darkMode ? 'border-slate-700' : 'border-slate-100'
                    }`}>
                    <span className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      Per person
                    </span>
                    <span className={`text-xl font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                      ${split.perPerson.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default SplitBill;