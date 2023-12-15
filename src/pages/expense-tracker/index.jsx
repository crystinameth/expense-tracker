import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import "./styles.css";
import { useNavigate } from "react-router-dom";

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const { name, profilePicture } = useGetUserInfo();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const { balance, income, expenses } = transactionTotals;

  const onSubmit = (e) => {
    e.preventDefault();        //This line prevents the default behavior of the form submission, which is a common practice in React to avoid the page from reloading when the form is submitted. By calling preventDefault(), you ensure that the form doesn't perform its default action, allowing you to handle the submission programmatically.
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });

    setDescription("");
    setTransactionAmount("");
  };

  const signUserOut = async () => {
    try{
      await signOut(auth);
      localStorage.clear();
      navigate("/")
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="expense-tracker">
        <div className="container">
          <h1> {name}'s Expense Tracker</h1>
          <div className="balance">
            <h2> Your Balance </h2>
            {balance >= 0 ? (
              <h3> ${balance} </h3>
            ) : (
              <h3> -${balance * -1} </h3>
            )}
            
          </div>
          <div className="summary">
            <div className="income">
              <h2> Income </h2>
              <h3>${income}</h3>
            </div>
            <div className="expense">
              <h2> Expense </h2>
              <h3>${expenses}</h3>
            </div>
          </div>
          <form className="add-transaction" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder=" Description "
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder=" Amount "
              value={transactionAmount}
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

        {profilePicture && (
          <div className="profile">
            {" "}
            <img className="profile-photo" src={profilePicture} alt="profile" />
            <button className="sign-out-button" onClick={signUserOut}>
              Sign Out
            </button>
          </div>
        )}

      </div>

      <div className="transactions">
        <h3> Transaction History </h3>
        <ul className="transaction-list">
          {transactions.map((transaction) => {
            const { description, transactionAmount, transactionType } = transaction;
            return (
              <li>
                <h4> {description} </h4>
                <p> 
                  ${transactionAmount} | 
                  <label 
                    style={{
                      color: transactionType === "expense" ? "red" : "green"
                    }}
                  > 
                    {" "}
                    {transactionType}{" "}
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
