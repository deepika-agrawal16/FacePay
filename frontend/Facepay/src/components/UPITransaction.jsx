import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SendMoney = () => {
  const [receiverPhoneNumber, setReceiverPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/face-recognition', {
      state: { receiverPhoneNumber, amount: parseFloat(amount) }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto space-y-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold">Send Money</h2>

      <input
        type="text"
        value={receiverPhoneNumber}
        onChange={(e) => setReceiverPhoneNumber(e.target.value)}
        placeholder="Receiver Phone Number"
        className="w-full px-4 py-2 border rounded"
        required
      />

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="w-full px-4 py-2 border rounded"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Proceed with Face Verification
      </button>
    </form>
  );
};

export default SendMoney;
