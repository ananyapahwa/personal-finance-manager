import React, { useState } from 'react';
import { Wallet, TrendingUp, Trash2 } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

const Transactions = ({ transactions, setTransactions }) => {
  const [newTx, setNewTx] = useState({ title: '', amount: '', category: 'food', type: 'expense' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTx.title || !newTx.amount) return;
    const tx = {
      id: Date.now(),
      ...newTx,
      amount: parseFloat(newTx.amount),
      date: new Date().toISOString().split('T')[0]
    };
    setTransactions([tx, ...transactions]);
    setNewTx({ title: '', amount: '', category: 'food', type: 'expense' });
  };

  const deleteTx = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-slate-800">Transactions</h2>
        <p className="text-slate-500">Manage your expenses and income.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Transaction Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Add New</h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Description</label>
                <input 
                  type="text"
                  value={newTx.title}
                  onChange={(e) => setNewTx({...newTx, title: e.target.value})}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g. Grocery Shopping"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-slate-400">$</span>
                  <input 
                    type="number"
                    value={newTx.amount}
                    onChange={(e) => setNewTx({...newTx, amount: e.target.value})}
                    className="w-full p-3 pl-8 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Type</label>
                  <select 
                    value={newTx.type}
                    onChange={(e) => setNewTx({...newTx, type: e.target.value})}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Category</label>
                  <select 
                    value={newTx.category}
                    onChange={(e) => setNewTx({...newTx, category: e.target.value})}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200">
                Add Transaction
              </button>
            </form>
          </div>
        </div>

        {/* Transaction List */}
        <div className="lg:col-span-2 space-y-4">
          {transactions.map((t) => {
            const cat = CATEGORIES.find(c => c.id === t.category) || CATEGORIES[0];
            return (
              <div key={t.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${t.type === 'expense' ? 'bg-slate-100 text-slate-600' : 'bg-emerald-100 text-emerald-600'}`}>
                     {t.type === 'expense' ? <Wallet size={20} /> : <TrendingUp size={20} />}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{t.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${cat.color}`}>
                        {cat.name}
                      </span>
                      <span className="text-xs text-slate-400">{t.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className={`text-lg font-bold ${t.type === 'income' ? 'text-emerald-600' : 'text-slate-800'}`}>
                    {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                  </span>
                  <button onClick={() => deleteTx(t.id)} className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
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