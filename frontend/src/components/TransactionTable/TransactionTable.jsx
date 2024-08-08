import { useEffect, useState } from "react";
import axios from "axios";
import "./TransactionTable.css";

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, [filterType, startDate, endDate]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/transactions"
      );
      let filteredTransactions = response.data;

      if (filterType) {
        filteredTransactions = filteredTransactions.filter(
          (t) => t.type === filterType
        );
      }

      if (startDate) {
        filteredTransactions = filteredTransactions.filter(
          (t) => new Date(t.date) >= new Date(startDate)
        );
      }

      if (endDate) {
        filteredTransactions = filteredTransactions.filter(
          (t) => new Date(t.date) <= new Date(endDate)
        );
      }

      setTransactions(filteredTransactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  return (
    <div className="table-container">
      <h2 className="table-head">Transaction History</h2>
      <div className="filters">
        <label>Filter by Type:</label>
        <select
          className="table-input"
          onChange={(e) => setFilterType(e.target.value)}
          value={filterType}
        >
          <option value="">All</option>
          <option value="deposit">Deposit</option>
          <option value="withdraw">Withdraw</option>
        </select>
        <label>Start Date:</label>
        <input
          className="table-input"
          type="date"
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label>End Date:</label>
        <input
          className="table-input"
          type="date"
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div className="list-table">
        <div className="list-table-format ">
          <b>Date</b>
          <b>Email</b>
          <b>Transaction Charge</b>
          <b>Previous Balance</b>
          <b>Total Amount</b>
          <b>Transfer Amount</b>
          <b>Type</b>
        </div>
        {transactions.map((transaction, index) => {
          return (
            <div key={index} className="list-table-format list-table ">
              <p>{new Date(transaction.date).toLocaleString()}</p>
              <p>{transaction.email}</p>
              <p className="entity">{transaction.transactionCharge}</p>
              <p className="entity">{transaction.previousBalance}</p>
              <p className="entity">{transaction.totalBalance}</p>
              <p className="entity">{transaction.amount}</p>
              <p>{transaction.type == "deposit" ? <p className="depo">{transaction.type}</p> : <p className="with">{transaction.type}</p> }</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionTable;
