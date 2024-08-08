const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Helper function to calculate total balance
const calculateBalance = async () => {
    const transactions = await Transaction.find();
    return transactions.reduce((total, transaction) => {
        if (transaction.type === 'deposit') {
            return total + transaction.amount;
        } else {
            return total - transaction.amount;
        }
    }, 0);
};

// POST /api/transactions/deposit
router.post('/deposit', async (req, res) => {
    try {
        const { email, amount } = req.body;
        const transactionCharge = 10;
        const depositAmount = amount - transactionCharge;

        const previousBalance = await calculateBalance();
        const totalBalance = previousBalance + depositAmount;

        const transaction = new Transaction({
            email,
            amount: depositAmount,
            type: 'deposit',
            transactionCharge,
            previousBalance,
            totalBalance
        });

        await transaction.save();
        res.json({ message: 'Deposit successful', totalBalance });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/transactions/withdraw
router.post('/withdraw', async (req, res) => {
    try {
        const { email, amount } = req.body;
        const transactionCharge = 10;
        const withdrawAmount = amount - transactionCharge;

        const previousBalance = await calculateBalance();
        const totalBalance = previousBalance - amount;

        if (totalBalance < 0) {
            return res.status(400).json({ error: 'Insufficient balance' });
        }

        const transaction = new Transaction({
            email,
            amount: withdrawAmount,
            type: 'withdraw',
            transactionCharge,
            previousBalance,
            totalBalance
        });

        await transaction.save();
        res.json({ message: 'Withdrawal successful', totalBalance });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /api/transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
