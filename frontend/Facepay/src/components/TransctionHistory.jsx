import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const TransactionHistory = () => {
  const [transactionsByDate, setTransactionsByDate] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/auth/transactions/history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          const grouped = res.data.transactions.reduce((acc, txn) => {
            const dateKey = moment(txn.createdAt).format('MMMM DD, YYYY');
            if (!acc[dateKey]) acc[dateKey] = [];
            acc[dateKey].push(txn);
            return acc;
          }, {});

          setTransactionsByDate(grouped);
        } else {
          setError('Failed to fetch transactions');
        }
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) return <div className="text-center py-8">Loading transactions...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Transaction History</h1>
      
      {Object.keys(transactionsByDate).length === 0 ? (
        <p className="text-gray-500 text-center py-8">No transactions found.</p>
      ) : (
        Object.entries(transactionsByDate).map(([date, txns]) => (
          <div key={date} className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-3 border-b pb-1">{date}</h2>
            <div className="space-y-4">
              {txns.map((txn) => (
                <div key={txn._id} className="p-4 border rounded-xl shadow-sm bg-white flex justify-between items-center">
                  <div>
                    <p className="text-gray-700 font-medium">
                      To: <span className="text-black">{txn.receiverPhoneNumber}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      {moment(txn.createdAt).format('hh:mm A')} • {txn.status}
                    </p>
                  </div>
                  <div className="text-lg font-semibold text-green-600">
                    ₹{txn.amount.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TransactionHistory;