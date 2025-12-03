import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Wallet,
  PiggyBank,
  Users,
  Plus,
  TrendingUp,
  TrendingDown,
  IndianRupee,
  Trash2,
  CheckCircle,
  Menu,
  X,
  Moon,
  Sun,
  Zap,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles
} from 'lucide-react';

const Dashboard = ({ transactions, savings, darkMode, setDarkMode }) => {
  const navigate = useNavigate();

  const handleQuickAction = (action) => {
    switch (action) {
      case 'Add Income':
        navigate('/transactions', { state: { type: 'income' } });
        break;
      case 'Add Expense':
        navigate('/transactions', { state: { type: 'expense' } });
        break;
      case 'New Goal':
        navigate('/savings', { state: { openModal: true } });
        break;
      case 'Reports':
        alert('Reports feature coming soon!');
        break;
      default:
        break;
    }
  };
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'}`}>
      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        {/* Header with Theme Toggle */}
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-xl ${darkMode ? 'bg-purple-500/20' : 'bg-gradient-to-r from-purple-500 to-pink-500'} backdrop-blur-sm`}>
                <Sparkles className={darkMode ? 'text-purple-400' : 'text-white'} size={24} />
              </div>
              <h1 className={`text-3xl lg:text-4xl font-bold bg-gradient-to-r ${darkMode ? 'from-purple-400 via-pink-400 to-blue-400' : 'from-purple-600 via-pink-600 to-blue-600'} bg-clip-text text-transparent`}>
                Financial Hub
              </h1>
            </div>
            <p className={`${darkMode ? 'text-slate-400' : 'text-slate-600'} ml-14`}>
              Welcome back! Here's your overview ✨
            </p>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-4 rounded-2xl transition-all duration-300 transform hover:scale-110 ${darkMode
              ? 'bg-slate-800/50 text-yellow-400 hover:bg-slate-800/70'
              : 'bg-white/80 text-slate-700 hover:bg-white shadow-lg'
              } backdrop-blur-sm`}
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        {/* Premium Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Balance Card */}
          <div className={`relative overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${darkMode
            ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30'
            : 'bg-gradient-to-br from-emerald-400 to-teal-500 shadow-xl'
            } backdrop-blur-sm group`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${darkMode ? 'bg-emerald-500/20' : 'bg-white/30'} backdrop-blur-sm`}>
                  <Wallet className={darkMode ? 'text-emerald-400' : 'text-white'} size={28} />
                </div>
                <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${darkMode ? 'bg-emerald-500/30' : 'bg-white/40'} backdrop-blur-sm`}>
                  <TrendingUp size={14} className={darkMode ? 'text-emerald-300' : 'text-white'} />
                  <span className={`text-sm font-bold ${darkMode ? 'text-emerald-300' : 'text-white'}`}>+12.5%</span>
                </div>
              </div>
              <p className={`text-sm font-medium mb-1 ${darkMode ? 'text-emerald-300/80' : 'text-white/90'}`}>Total Balance</p>
              <h3 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-white'}`}>
                ₹{balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h3>
            </div>
          </div>

          {/* Income Card */}
          <div className={`relative overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${darkMode
            ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30'
            : 'bg-gradient-to-br from-blue-400 to-cyan-500 shadow-xl'
            } backdrop-blur-sm group`}>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${darkMode ? 'bg-blue-500/20' : 'bg-white/30'} backdrop-blur-sm`}>
                  <ArrowUpRight className={darkMode ? 'text-blue-400' : 'text-white'} size={28} />
                </div>
                <Zap className={darkMode ? 'text-blue-300' : 'text-white/80'} size={20} />
              </div>
              <p className={`text-sm font-medium mb-1 ${darkMode ? 'text-blue-300/80' : 'text-white/90'}`}>Monthly Income</p>
              <h3 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-white'}`}>
                ₹{totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h3>
            </div>
          </div>

          {/* Expense Card */}
          <div className={`relative overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${darkMode
            ? 'bg-gradient-to-br from-rose-500/20 to-pink-500/20 border border-rose-500/30'
            : 'bg-gradient-to-br from-rose-400 to-pink-500 shadow-xl'
            } backdrop-blur-sm group`}>
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${darkMode ? 'bg-rose-500/20' : 'bg-white/30'} backdrop-blur-sm`}>
                  <ArrowDownRight className={darkMode ? 'text-rose-400' : 'text-white'} size={28} />
                </div>
              </div>
              <p className={`text-sm font-medium mb-1 ${darkMode ? 'text-rose-300/80' : 'text-white/90'}`}>Monthly Expenses</p>
              <h3 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-white'}`}>
                ₹{totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h3>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <div className={`rounded-3xl p-6 transition-all duration-300 ${darkMode
            ? 'bg-slate-800/40 border border-slate-700/50'
            : 'bg-white/80 shadow-xl'
            } backdrop-blur-lg`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                Recent Transactions
              </h3>
              <button
                onClick={() => navigate('/transactions')}
                className={`p-2 rounded-xl transition-all hover:scale-110 ${darkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'
                  }`}>
                <Plus size={20} />
              </button>
            </div>
            <div className="space-y-3">
              {transactions.slice(0, 5).map((t, index) => (
                <div
                  key={t.id}
                  className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 hover:scale-102 ${darkMode
                    ? 'bg-slate-700/30 hover:bg-slate-700/50'
                    : 'bg-slate-50 hover:bg-slate-100'
                    }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${t.type === 'income'
                      ? darkMode
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-emerald-100 text-emerald-600'
                      : darkMode
                        ? 'bg-rose-500/20 text-rose-400'
                        : 'bg-slate-100 text-slate-600'
                      }`}>
                      {t.type === 'income' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                    </div>
                    <div>
                      <p className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                        {t.title}
                      </p>
                      <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {t.date} • {t.category}
                      </p>
                    </div>
                  </div>
                  <span className={`font-bold text-lg ${t.type === 'income'
                    ? darkMode ? 'text-emerald-400' : 'text-emerald-600'
                    : darkMode ? 'text-rose-400' : 'text-slate-700'
                    }`}>
                    {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Savings Goals */}
          <div className={`rounded-3xl p-6 transition-all duration-300 ${darkMode
            ? 'bg-slate-800/40 border border-slate-700/50'
            : 'bg-white/80 shadow-xl'
            } backdrop-blur-lg`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                Savings Goals
              </h3>
              <button className={`p-2 rounded-xl transition-all hover:scale-110 ${darkMode ? 'bg-pink-500/20 text-pink-400' : 'bg-pink-100 text-pink-600'
                }`}>
                <Target size={20} />
              </button>
            </div>
            <div className="space-y-6">
              {savings.map((goal, index) => {
                const percentage = Math.min((goal.current / goal.target) * 100, 100);
                return (
                  <div
                    key={goal.id}
                    className="group"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex justify-between mb-3">
                      <span className={`font-semibold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-700'}`}>
                        <span className="text-2xl">{goal.icon}</span>
                        {goal.name}
                      </span>
                      <span className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {percentage.toFixed(0)}%
                      </span>
                    </div>
                    <div className={`h-3 w-full rounded-full overflow-hidden ${darkMode ? 'bg-slate-700/50' : 'bg-slate-200'
                      }`}>
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full transition-all duration-1000 relative overflow-hidden group-hover:shadow-lg"
                        style={{ width: `${percentage}%` }}
                      >
                        <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                        ₹{goal.current.toLocaleString()}
                      </span>
                      <span className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                        ₹{goal.target.toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Plus, label: 'Add Income', color: 'emerald' },
            { icon: TrendingDown, label: 'Add Expense', color: 'rose' },
            { icon: PiggyBank, label: 'New Goal', color: 'purple' },
            { icon: LayoutDashboard, label: 'Reports', color: 'blue' }
          ].map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action.label)}
              className={`p-4 rounded-2xl transition-all duration-300 hover:scale-105 ${darkMode
                ? `bg-${action.color}-500/20 hover:bg-${action.color}-500/30 border border-${action.color}-500/40 shadow-lg shadow-${action.color}-500/10`
                : `bg-white hover:bg-${action.color}-50 border border-transparent hover:border-${action.color}-200 shadow-lg hover:shadow-xl`
                } backdrop-blur-sm group`}
            >
              <action.icon
                className={`mx-auto mb-2 transition-all group-hover:scale-110 ${darkMode ? `text-${action.color}-400` : `text-${action.color}-600`
                  }`}
                size={24}
              />
              <p className={`text-sm font-bold ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                {action.label}
              </p>
            </button>
          ))}
        </div>
      </div>

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
        .hover\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default Dashboard;