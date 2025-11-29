import React from 'react';
import { LayoutDashboard, Wallet, PiggyBank, Users, DollarSign } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'expenses', label: 'Transactions', icon: Wallet },
    { id: 'savings', label: 'Savings Goals', icon: PiggyBank },
    { id: 'split', label: 'Split Bill', icon: Users },
  ];

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/50 z-20 lg:hidden ${isOpen ? 'block' : 'hidden'}`}
        onClick={() => setIsOpen(false)}
      />

      <div className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transform transition-transform duration-200 overflow-y-auto  ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <DollarSign size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">FinTrack</h1>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === item.id 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 w-full p-6">
          <div className="bg-slate-800 rounded-xl p-4">
            <p className="text-xs text-slate-400 mb-1">Total Balance</p>
            <p className="text-xl font-bold text-white">$14,250.00</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
