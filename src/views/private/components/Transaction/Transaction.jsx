import React from "react";
import FontAwesomeIcon from "../FontAwesomeIcon/FontAwesomeIcon";
import PropTypes from "prop-types";

const Transaction = ({ transaction, deleteTransaction }) => {
  const { text, amount } = transaction;
  const sign = amount < 0 ? "-" : "+";

  return (
    <li className={amount < 0 ? "minus" : "plus"}>
      {text}{" "}
      <span>
        {sign}${Math.abs(amount)}
      </span>
      <button
        onClick={() => deleteTransaction(transaction.id)}
        className="delete-btn"
      >
        <FontAwesomeIcon size="md" icon="trash" className="list-trash" />
      </button>
    </li>
  );
};

Transaction.propTypes = {
  transaction: PropTypes.object.isRequired,
  deleteTransaction: PropTypes.func.isRequired,
};

export default Transaction;
