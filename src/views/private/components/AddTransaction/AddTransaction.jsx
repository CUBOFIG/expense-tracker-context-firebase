import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const AddTransaction = ({ addTask }) => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: uuidv4(),
      text,
      amount: +amount,
    };

    addTask(newTransaction);
  };

  return (
    <div className="m-0 p-0">
      <h3>Add new Transaction</h3>
      <form onSubmit={handleSubmit} className="p-0 back">
        <div className="w-100">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            placeholder="Enter text..."
            value={text}
            className="w-100"
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="w-100">
          <label htmlFor="amount">
            Amount <br />{" "}
            <b>
              <i className="letter">(negative - expense, positive - income)</i>
            </b>
          </label>
          <input
            type="number"
            id="amount"
            placeholder="Enter amount..."
            value={amount}
            className="w-100"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-css">
          Add transaction
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
