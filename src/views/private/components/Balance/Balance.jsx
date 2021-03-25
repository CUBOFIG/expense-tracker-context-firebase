import React from "react";

const Balance = ({ links }) => {
  const amount = links.map((transaction) => transaction.amount);
  const total = amount.reduce((acc, item) => (acc += item), 0).toFixed(2);

  return (
    <>
      <h4>Your Balance</h4>
      <h1>${total}</h1>
    </>
  );
};

export default Balance;
