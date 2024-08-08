import { useState } from "react";
import axios from "axios";
import "./TransactionForm.css";

const TransactionForm = ({ updateBalance }) => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("deposit");
  const urll = "https://payu-backend-vl2j.onrender.com"

  const handleTransaction = async () => {
    if (!email || !amount) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const url =  urll + `/api/transactions/${transactionType}`;
      const response = await axios.post(url, {
        email,
        amount: parseFloat(amount),
      });
      alert(response.data.message);
      updateBalance(response.data.totalBalance);
    } catch (error) {
      console.error("Transaction error:", error);
      alert("Transaction failed");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-head">Make a Transaction</h2>
      <div className="inputs">
        <input
          className="form-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="form-input"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          className="form-input"
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
        >
          <option value="deposit">Deposit</option>
          <option value="withdraw">Withdraw</option>
        </select>
      <button className="submit-btn" onClick={handleTransaction}>Pay Now</button>
      </div>
    </div>
  );
};

export default TransactionForm;
