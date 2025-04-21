import React, { useState } from "react";
import bankImage from "../images/banktobank.jpg"

const BankTransaction = () => {
  const [holderName, setHolderName] = useState("");
  const [bankName, setBankName] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Transaction initiated:
    Holder: ${holderName}
    Bank: ${bankName}
    IFSC: ${ifsc}
    Account No: ${accountNumber}
    Amount: ₹${amount}`);
    // TODO: Send to backend or confirm with user
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-blue-50">
      <div className="flex flex-col w-full max-w-5xl overflow-hidden bg-white shadow-xl rounded-2xl md:flex-row">
        
        {/* Left Side - Form */}
        <div className="flex flex-col justify-center w-full p-8 md:w-1/2">
          <h2 className="mb-6 text-2xl font-bold text-blue-800">Bank to Bank Transaction</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 font-medium">Account Holder Name</label>
              <input
                type="text"
                value={holderName}
                onChange={(e) => setHolderName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Bank Name</label>
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">IFSC Code</label>
              <input
                type="text"
                value={ifsc}
                onChange={(e) => setIfsc(e.target.value)}
                className="w-full px-4 py-2 uppercase border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Account Number</label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Amount (₹)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Transfer Money
            </button>
          </form>
        </div>

        {/* Right Side - Image */}
        <div className="w-full md:w-1/2">
          <img
            src={bankImage}
            alt="Bank Transfer Illustration"
            className="object-cover object-center w-full h-full rounded-r-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default BankTransaction;
