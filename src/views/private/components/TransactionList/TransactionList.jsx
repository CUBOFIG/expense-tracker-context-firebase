import React from "react";
import Transaction from "../Transaction/Transaction";

const TransactionList = ({ links, deleteTask }) => {
  return (
    <>
      <h3>History</h3>
      <ul id="list" className="list">
        {links.map((transaction) => (
          <Transaction
            key={transaction.id}
            transaction={transaction}
            deleteTransaction={deleteTask}
          />
        ))}
      </ul>
    </>
  );
};

export default TransactionList;
