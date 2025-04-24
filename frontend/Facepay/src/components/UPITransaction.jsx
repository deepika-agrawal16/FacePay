import React, { useState } from "react";
import upiImage from "../images/upi.jpg"
import FaceRecognition from "../pages/FaceRecognition";
import { useNavigate } from "react-router-dom";

const UPITransaction = () => {
  const [upiId, setUpiId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert(`Transaction initiated:\nUPI ID: ${upiId}\nPhone: ${phoneNumber}\nAmount: ₹${amount}`);
    // TODO: handle actual transaction
    navigate('/face-recognition');
    // navigate('/face-recognition', { state: { upiId, phoneNumber, amount } });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-blue-50">
      <div className="flex flex-col w-full max-w-4xl overflow-hidden bg-white shadow-xl rounded-2xl md:flex-row">
        
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2 h-80 md:h-auto">
          <img
            src={upiImage}
            alt="Transaction Illustration"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Side - Form */}
        <div className="flex flex-col justify-center w-full p-8 md:w-1/2">
          <h2 className="mb-6 text-2xl font-bold text-blue-800">UPI Transaction</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 font-medium">UPI ID</label>
              <input
                type="text"
                placeholder="example@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Amount (₹)</label>
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 text-white transition bg-blue-600 rounded-md hover:bg-blue-700"

            >
              Send Money
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UPITransaction;
