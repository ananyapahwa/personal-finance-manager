export function SplitFriends({ friends, setFriends, splitAmount, setSplitAmount, addSplit }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl max-w-xl">
      <h2 className="text-2xl font-bold mb-4">Split With Friends</h2>

      <input
        className="p-2 rounded border w-full"
        value={friends}
        onChange={(e) => setFriends(e.target.value)}
        placeholder="Enter comma-separated names"
      />

      <input
        type="number"
        className="p-2 rounded border w-full mt-2"
        value={splitAmount}
        onChange={(e) => setSplitAmount(e.target.value)}
        placeholder="Total Amount"
      />

      <button
        onClick={addSplit}
        className="bg-green-600 text-white p-2 rounded-xl mt-3"
      >
        Split
      </button>
    </div>
  );
}
