export function Summary({ totalExpense, totalSavings }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl max-w-xl">
      <h2 className="text-2xl font-bold mb-4">Summary</h2>
      <p className="text-lg">Total Expense: ₹{totalExpense}</p>
      <p className="text-lg">Total Savings: ₹{totalSavings}</p>
    </div>
  );
}
