import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  TrendingUp, 
} from 'lucide-react'

const Savings = ({ savings, setSavings }) => {
  const addCapital = (id, amount) => {
    setSavings(savings.map(s => 
      s.id === id ? { ...s, current: s.current + amount } : s
    ));
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Savings Goals</h2>
          <p className="text-slate-500">Track your progress towards financial freedom.</p>
        </div>
        <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-slate-800">
          <Plus size={16} /> New Goal
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savings.map((goal) => {
           const percentage = Math.min((goal.current / goal.target) * 100, 100);
           return (
             <div key={goal.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-full">
               <div>
                 <div className="flex justify-between items-start mb-4">
                   <span className="text-4xl">{goal.icon}</span>
                   <button className="p-2 text-slate-300 hover:text-slate-600">
                     <TrendingUp size={20} />
                   </button>
                 </div>
                 <h3 className="font-bold text-slate-800 text-lg">{goal.name}</h3>
                 <p className="text-slate-500 text-sm mb-6">Target: ${goal.target.toLocaleString()}</p>
               </div>
               
               <div>
                 <div className="flex justify-between text-sm font-medium mb-2">
                   <span className="text-emerald-600">${goal.current.toLocaleString()}</span>
                   <span className="text-slate-400">{Math.round(percentage)}%</span>
                 </div>
                 <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden mb-6">
                   <div 
                     className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                     style={{ width: `${percentage}%` }}
                   />
                 </div>
                 <button 
                   onClick={() => addCapital(goal.id, 100)}
                   className="w-full py-2 border border-slate-200 rounded-lg text-slate-600 font-medium text-sm hover:bg-slate-50 transition-colors"
                 >
                   Add $100
                 </button>
               </div>
             </div>
           );
        })}
      </div>
    </div>
  );
};

export default Savings;