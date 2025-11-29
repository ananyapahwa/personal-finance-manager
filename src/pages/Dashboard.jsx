
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  PiggyBank, 
  Users, 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Trash2, 
  CheckCircle,
  Menu,
  X
} from 'lucide-react'

const Dashboard = ({ transactions, savings }) => {
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>
        <p className="text-slate-500">Welcome back, here's your financial overview.</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <DollarSign className="text-emerald-600" size={24} />
            </div>
            <span className="text-xs font-medium px-2 py-1 bg-emerald-50 text-emerald-600 rounded-full">+12%</span>
          </div>
          <p className="text-slate-500 text-sm">Total Balance</p>
          <h3 className="text-3xl font-bold text-slate-800 mt-1">${balance.toFixed(2)}</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="text-blue-600" size={24} />
            </div>
          </div>
          <p className="text-slate-500 text-sm">Monthly Income</p>
          <h3 className="text-3xl font-bold text-slate-800 mt-1">${totalIncome.toFixed(2)}</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <TrendingDown className="text-red-600" size={24} />
            </div>
          </div>
          <p className="text-slate-500 text-sm">Monthly Expenses</p>
          <h3 className="text-3xl font-bold text-slate-800 mt-1">${totalExpense.toFixed(2)}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Recent Transactions</h3>
          <div className="space-y-4">
            {transactions.slice(0, 4).map((t) => (
              <div key={t.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                    {t.type === 'income' ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{t.title}</p>
                    <p className="text-xs text-slate-400">{t.date}</p>
                  </div>
                </div>
                <span className={`font-bold ${t.type === 'income' ? 'text-emerald-600' : 'text-slate-800'}`}>
                  {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Savings Goals Preview */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Savings Goals</h3>
          <div className="space-y-6">
            {savings.slice(0, 3).map((goal) => {
              const percentage = Math.min((goal.current / goal.target) * 100, 100);
              return (
                <div key={goal.id}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-slate-700 flex gap-2">
                      <span>{goal.icon}</span> {goal.name}
                    </span>
                    <span className="text-slate-500 text-sm">${goal.current} / ${goal.target}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;