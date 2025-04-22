import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const banks = ["State Bank of India (SBI)", "Bank of India (BOI)", "HDFC Bank", "ICICI Bank", "Punjab National Bank", "Axis Bank"];

const BankForm = () => {
  const [bankName, setBankName] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [holderName, setHolderName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const bankDetails = {
      bankName,
      accountNo,
      ifsc,
      holderName,
    };

    // Save to localStorage or context/state (simple version here)
    localStorage.setItem("bankDetails", JSON.stringify(bankDetails));
    navigate("/details");
  };

  return (
    <div className="max-w-xl p-6 mx-auto mt-10 bg-white shadow-lg rounded-xl">
      <h2 className="mb-6 text-2xl font-bold text-center text-blue-600">Enter Bank Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Bank Name</label>
          <select
            className="w-full p-2 border rounded"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            required
          >
            <option value="">Select a bank</option>
            {banks.map((bank, index) => (
              <option key={index} value={bank}>
                {bank}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Account Number</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={accountNo}
            onChange={(e) => setAccountNo(e.target.value)}
            placeholder="Enter account number"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">IFSC Code</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={ifsc}
            onChange={(e) => setIfsc(e.target.value)}
            placeholder="Enter IFSC Code"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Account Holder Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={holderName}
            onChange={(e) => setHolderName(e.target.value)}
            placeholder="Enter account holder name"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          onClick={() => navigate('/details')}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BankForm;

//TODO: Add validation for account number and IFSC code formats
//TODO: Store bank details is safe or not?

