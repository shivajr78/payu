const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['deposit', 'withdraw'], required: true },
    transactionCharge: { type: Number, default: 10 },
    previousBalance: { type: Number, required: true },
    totalBalance: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', transactionSchema);
