import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import "./styles.css";

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions } = useGetTransactions();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const onSubmit = (e) => {
    e.preventDefault();        //This line prevents the default behavior of the form submission, which is a common practice in React to avoid the page from reloading when the form is submitted. By calling preventDefault(), you ensure that the form doesn't perform its default action, allowing you to handle the submission programmatically.
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
  };

  return (
    <>
      <div className="expense-tracker">
        <div className="container">
          <h1>Expense Tracker</h1>
          <div className="balance">
            <h2>Your Balance</h2>
            <h3>$0.00</h3>
          </div>
          <div className="summary">
            <div className="income">
              <h2>Income</h2>
              <h3>$0.00</h3>
            </div>
            <div className="expense">
              <h2>Expense</h2>
              <h3>$0.00</h3>
            </div>
          </div>
          <form className="add-transaction" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder=" Description "
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder=" Amount "
              required
              onChange={(e) => setTransactionAmount(e.target.value)}
            />

            <input 
                type="radio" 
                value="income" 
                id="income" 
                checked={transactionType === "income"}
                onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="income"> Income </label>

            <input 
                type="radio" 
                value="expense" 
                id="expense"
                checked={transactionType === "expense"}
                onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="expense"> Expense </label>

            <button type="submit"> Add Transaction </button>

          </form>
        </div>
      </div>

      <div className="transaction-history">
        <h3>Transaction History</h3>
        <ul className="transaction-list">
          {transactions.map((transaction) => {
            const { description, transactionAmount, transactionType } = transaction;
            return (
              <li>
                <h4> {description} </h4>
                <p> ${transactionAmount} | <label 
                                              style={{color: transactionType === "expense" ? "red" : "green"}}> 
                                              {transactionType} 
                                            </label>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
