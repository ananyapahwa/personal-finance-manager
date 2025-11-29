export const CATEGORIES = [
  { id: 'food', name: 'Food & Dining', color: 'bg-orange-100 text-orange-600' },
  { id: 'transport', name: 'Transportation', color: 'bg-blue-100 text-blue-600' },
  { id: 'housing', name: 'Housing', color: 'bg-purple-100 text-purple-600' },
  { id: 'entertainment', name: 'Entertainment', color: 'bg-pink-100 text-pink-600' },
  { id: 'shopping', name: 'Shopping', color: 'bg-teal-100 text-teal-600' },
];

export const INITIAL_TRANSACTIONS = [
  { id: 1, title: 'Grocery Run', amount: 120.50, type: 'expense', category: 'food', date: '2023-10-25' },
  { id: 2, title: 'Uber to Work', amount: 25.00, type: 'expense', category: 'transport', date: '2023-10-24' },
  { id: 3, title: 'Freelance Project', amount: 1500.00, type: 'income', category: 'shopping', date: '2023-10-23' },
  { id: 4, title: 'Netflix Subscription', amount: 15.99, type: 'expense', category: 'entertainment', date: '2023-10-22' },
];

export const INITIAL_SAVINGS = [
  { id: 1, name: 'New Macbook', target: 2000, current: 1250, icon: '💻' },
  { id: 2, name: 'Bali Trip', target: 5000, current: 800, icon: '🌴' },
  { id: 3, name: 'Emergency Fund', target: 10000, current: 4500, icon: '🛡️' },
];
