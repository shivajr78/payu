import { useState,useEffect } from 'react';
import TransactionForm from './components/TransactionForm/TransactionForm';
import TransactionTable from './components/TransactionTable/TransactionTable';
import Navbar from './components/Navbar/Navbar';
import axios from "axios";

function App() {
    const [balance, setBalance] = useState("");
    
    useEffect(() => {
        const fetchInitialBalance = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/transactions/balance');
                setBalance(response.data.totalBalance);
            } catch (error) {
                console.error('Error fetching initial balance:', error);
            }
        };

        fetchInitialBalance();
    }, []);

    const updateBalance = (newBalance) => {
        setBalance(newBalance);
    };

    return (
        <div>
            <Navbar balance={balance} />
            <TransactionForm updateBalance={updateBalance} />
            <TransactionTable />
        </div>
    );
}

export default App;
