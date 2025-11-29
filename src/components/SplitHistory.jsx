export function SplitHistory({ splitList }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl max-w-3xl">
      <h2 className="text-2xl font-bold mb-4">Split Records</h2>
      <div className="grid gap-4">
        {splitList.map((s) => (
          <div key={s.id} className="p-3 border rounded-xl">
            <p className="font-bold">Total: ₹{s.total}</p>
            <p>Per Person: ₹{s.perHead}</p>
            <p>People: {s.list.join(', ')}</p>
            <p className="text-sm text-gray-500">{s.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
