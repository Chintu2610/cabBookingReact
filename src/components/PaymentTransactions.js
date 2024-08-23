import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentTransaction = () => {
    // State for managing payment transactions and form input values
    const [transactions, setTransactions] = useState([]);
    const [transaction, setTransaction] = useState({
        bookingId: '',
        amountPaid: '',
        paymentMethod: '',
        paymentDate: '',
        invoiceNumber: '',
        commission: '',
        payoutStatus: 'PENDING'
    });

    // Function to fetch all payment transactions
    const fetchTransactions = async () => {
        try {
            const response = await axios.get('/api/payment-transactions');
            setTransactions(response.data);
        } catch (error) {
            console.error('Error fetching transactions', error);
        }
    };

    // Function to handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransaction({
            ...transaction,
            [name]: value
        });
    };

    // Function to handle form submission for creating a new transaction
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/payment-transactions', transaction);
            setTransactions([...transactions, response.data]);
            setTransaction({
                bookingId: '',
                amountPaid: '',
                paymentMethod: '',
                paymentDate: '',
                invoiceNumber: '',
                commission: '',
                payoutStatus: 'PENDING'
            });
        } catch (error) {
            console.error('Error creating transaction', error);
        }
    };

    // Function to delete a transaction
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/payment-transactions/${id}`);
            setTransactions(transactions.filter(transaction => transaction.transactionId !== id));
        } catch (error) {
            console.error('Error deleting transaction', error);
        }
    };

    // Fetch all transactions when the component loads
    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <div>
            <h2>Payment Transactions</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Booking ID:</label>
                    <input
                        type="text"
                        name="bookingId"
                        value={transaction.bookingId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Amount Paid:</label>
                    <input
                        type="number"
                        name="amountPaid"
                        value={transaction.amountPaid}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Payment Method:</label>
                    <input
                        type="text"
                        name="paymentMethod"
                        value={transaction.paymentMethod}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Payment Date:</label>
                    <input
                        type="datetime-local"
                        name="paymentDate"
                        value={transaction.paymentDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Invoice Number:</label>
                    <input
                        type="text"
                        name="invoiceNumber"
                        value={transaction.invoiceNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Commission:</label>
                    <input
                        type="number"
                        name="commission"
                        value={transaction.commission}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Payout Status:</label>
                    <select
                        name="payoutStatus"
                        value={transaction.payoutStatus}
                        onChange={handleChange}
                        required
                    >
                        <option value="PROCESSED">Processed</option>
                        <option value="PENDING">Pending</option>
                    </select>
                </div>
                <button type="submit">Add Transaction</button>
            </form>

            <h3>Existing Transactions</h3>
            <table>
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Booking ID</th>
                        <th>Amount Paid</th>
                        <th>Payment Method</th>
                        <th>Payment Date</th>
                        <th>Invoice Number</th>
                        <th>Commission</th>
                        <th>Payout Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.transactionId}>
                            <td>{transaction.transactionId}</td>
                            <td>{transaction.bookingId}</td>
                            <td>{transaction.amountPaid}</td>
                            <td>{transaction.paymentMethod}</td>
                            <td>{transaction.paymentDate}</td>
                            <td>{transaction.invoiceNumber}</td>
                            <td>{transaction.commission}</td>
                            <td>{transaction.payoutStatus}</td>
                            <td>
                                <button onClick={() => handleDelete(transaction.transactionId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentTransaction;
