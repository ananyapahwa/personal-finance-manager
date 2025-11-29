import React, { useState } from 'react';
import { DollarSign, Menu, X } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Savings from './pages/Savings';
import SplitBill from './pages/SplitBill';
import { INITIAL_TRANSACTIONS, INITIAL_SAVINGS } from './data/mockData';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [savings, setSavings] = useState(INITIAL_SAVINGS);

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="lg:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <DollarSign size={20} className="text-white" />
            </div>
            <span className="font-bold text-slate-800">FinTrack</span>
          </div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-600">
            {isSidebarOpen ? <X /> : <Menu />}
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="w-full px-4 lg:px-8">

            {activeTab === 'dashboard' && <Dashboard transactions={transactions} savings={savings} />}
            {activeTab === 'expenses' && <Transactions transactions={transactions} setTransactions={setTransactions} />}
            {activeTab === 'savings' && <Savings savings={savings} setSavings={setSavings} />}
            {activeTab === 'split' && <SplitBill />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
