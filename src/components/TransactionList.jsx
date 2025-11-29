export function TransactionList({ transactions }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl max-w-3xl">
      <h2 className="text-2xl font-bold mb-4">All Transactions</h2>
      <div className="grid gap-4">
        {transactions.map((t) => (
          <div key={t.id} className="p-3 border rounded-xl flex justify-between">
            <div>
              <p className="font-bold">{t.category} ({t.type})</p>
              <p>{t.desc}</p>
              <p className="text-sm text-gray-500">{t.date}</p>
            </div>
            <p className="font-bold">₹{t.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
