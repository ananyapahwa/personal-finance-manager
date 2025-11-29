import React, { useState } from "react";

import { AddTransaction } from "./components/AddTransaction";
import { Summary } from "./components/Summary";
import { TransactionList } from "./components/TransactionList";
import { SplitFriends } from "./components/SplitFriends";
import { SplitHistory } from "./components/SplitHistory";

export default function FinanceManager() {
  const [transactions, setTransactions] = useState([]);
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState(0);
  const [desc, setDesc] = useState("");

  const [friends, setFriends] = useState("");
  const [splitAmount, setSplitAmount] = useState(0);
  const [splitList, setSplitList] = useState([]);

  const addTransaction = () => {
    const newT = {
      id: Date.now(),
      type,
      category,
      amount: parseFloat(amount),
      desc,
      date: new Date().toLocaleString(),
    };
    setTransactions([newT, ...transactions]);
    setAmount(0);
    setDesc("");
  };

  const addSplit = () => {
    const list = friends.split(",").map((f) => f.trim());
    const perHead = splitAmount / list.length;

    const newSplit = {
      id: Date.now(),
      list,
      total: splitAmount,
      perHead: perHead.toFixed(2),
      date: new Date().toLocaleString(),
    };

    setSplitList([newSplit, ...splitList]);
    setFriends("");
    setSplitAmount(0);
  };

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);

  const totalSavings = transactions
    .filter((t) => t.type === "saving")
    .reduce((s, t) => s + t.amount, 0);

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex flex-col gap-10">
      <h1 className="text-4xl font-bold mb-4">Personal Finance Manager</h1>

      <AddTransaction
        type={type}
        setType={setType}
        category={category}
        setCategory={setCategory}
        amount={amount}
        setAmount={setAmount}
        desc={desc}
        setDesc={setDesc}
        addTransaction={addTransaction}
      />

      <Summary totalExpense={totalExpense} totalSavings={totalSavings} />

      <TransactionList transactions={transactions} />

      <SplitFriends
        friends={friends}
        setFriends={setFriends}
        splitAmount={splitAmount}
        setSplitAmount={setSplitAmount}
        addSplit={addSplit}
      />

      <SplitHistory splitList={splitList} />
    </div>
  );
}
