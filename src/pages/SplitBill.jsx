import React, { useState } from 'react';
import { Users, Plus } from 'lucide-react';

const SplitBill = () => {
  const [friends, setFriends] = useState(['Me', 'Alice', 'Bob']);
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

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-slate-800">Split Bill</h2>
        <p className="text-slate-500">Divide expenses easily among friends.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">New Expense</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Description</label>
              <input 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
                placeholder="e.g. Friday Dinner"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Total Bill Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-slate-400 text-lg">$</span>
                <input 
                  type="number"
                  value={billAmount}
                  onChange={(e) => setBillAmount(e.target.value)}
                  className="w-full p-3 pl-8 bg-slate-50 border border-slate-200 rounded-xl text-lg font-bold text-slate-800"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-3">Split With</label>
              <div className="flex flex-wrap gap-3">
                {friends.map(friend => (
                  <button
                    key={friend}
                    onClick={() => toggleFriend(friend)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedFriends.includes(friend)
                        ? 'bg-slate-800 text-white shadow-lg shadow-slate-200 scale-105'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {friend}
                  </button>
                ))}
                <button className="w-8 h-8 rounded-full border border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:border-slate-400 hover:text-slate-600">
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {billAmount && selectedFriends.length > 0 && (
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-emerald-800 text-sm font-medium">Each person pays</span>
                  <span className="text-2xl font-bold text-emerald-600">
                    ${(parseFloat(billAmount) / selectedFriends.length).toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            <button 
              onClick={handleSplit}
              disabled={!billAmount || selectedFriends.length === 0}
              className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Split Expense
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800">Recent Splits</h3>
          {splitHistory.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <Users className="mx-auto text-slate-300 mb-3" size={32} />
              <p className="text-slate-400">No bills split yet.</p>
            </div>
          ) : (
            splitHistory.map(split => (
              <div key={split.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-slate-800">{split.description}</h4>
                    <p className="text-xs text-slate-400">{split.date}</p>
                  </div>
                  <span className="font-bold text-slate-800">${split.total.toFixed(2)}</span>
                </div>
                <div className="flex -space-x-2 overflow-hidden py-2">
                  {split.people.map((p, i) => (
                    <div key={i} className="inline-block h-8 w-8 rounded-full bg-slate-100 ring-2 ring-white flex items-center justify-center text-xs font-bold text-slate-600" title={p}>
                      {p.charAt(0)}
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-slate-50 flex justify-between text-sm">
                  <span className="text-slate-500">Per person</span>
                  <span className="font-medium text-emerald-600">${split.perPerson.toFixed(2)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SplitBill;