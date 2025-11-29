export function AddTransaction({ type, setType, category, setCategory, amount, setAmount, desc, setDesc, addTransaction }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl grid gap-4 max-w-xl">
      <h2 className="text-2xl font-bold">Add Transaction</h2>

      <select value={type} onChange={(e) => setType(e.target.value)} className="p-2 rounded border">
        <option value="expense">Expense</option>
        <option value="saving">Saving</option>
      </select>

      <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-2 rounded border">
        <option>Food</option>
        <option>Travel</option>
        <option>Shopping</option>
        <option>Health</option>
        <option>Other</option>
      </select>

      <input
        type="number"
        className="p-2 rounded border"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />

      <input
        className="p-2 rounded border"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Description"
      />

      <button onClick={addTransaction} className="bg-blue-600 text-white p-2 rounded-xl">
        Add
      </button>
    </div>
  );
}
