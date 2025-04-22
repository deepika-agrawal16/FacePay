// components/BankDetails.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const BankDetails = () => {
  const details = JSON.parse(localStorage.getItem("bankDetails"));
  const navigate = useNavigate();

  if (!details) {
    return (
      <div className="mt-10 text-center">
        <p>No bank details found. Please fill the form first.</p>
        <button
          className="px-4 py-2 mt-4 text-white bg-blue-600 rounded"
          onClick={() => navigate("/")}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="justify-center max-w-xl p-6 mx-auto mt-10 bg-white shadow-lg rounded-xl">
      <h2 className="mb-6 text-2xl font-bold text-center text-blue-600">Bank Details</h2>
      <div className="justify-center space-y-3 text-lg">
        <p><strong>Bank Name:</strong> {details.bankName}</p>
        <p><strong>Account Number:</strong> {details.accountNo}</p>
        <p><strong>IFSC Code:</strong> {details.ifsc}</p>
        <p><strong>Account Holder Name:</strong> {details.holderName}</p>
      </div>
    </div>
  );
};

export default BankDetails;
