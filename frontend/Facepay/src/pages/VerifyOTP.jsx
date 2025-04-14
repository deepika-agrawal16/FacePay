import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyOTP = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (!storedEmail) {
      setError('Email not found. Please register again.');
    } else {
      setEmail(storedEmail);
    }
  }, []);

  const handleChange = (e) => {
    setOtp(e.target.value);
    setError('');
    setSuccessMessage('');
  };

  const validateOtp = () => {
    if (!otp) return 'OTP is required';
    if (!/^\d{6}$/.test(otp)) return 'OTP must be 6 digits';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateOtp();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsVerifying(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/verify-otp',
        { otp, email },
        { headers: { 'Content-Type': 'application/json' } }
      );

      setSuccessMessage(response.data.message);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to verify OTP.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      setError('Email is missing. Cannot resend OTP.');
      return;
    }

    setIsResending(true);
    setError('');
    setSuccessMessage('');

    try {
      await axios.post(
        'http://localhost:5000/api/auth/resend-otp',
        { email },
        { headers: { 'Content-Type': 'application/json' } }
      );

      setSuccessMessage('OTP has been resent to your email.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-100">
      <div className="w-[90%] max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600">Enter OTP</h2>
        <p className="mt-2 text-center text-gray-600">
          {email ? `We’ve sent a 6-digit OTP to ${email}` : 'Loading email...'}
        </p>

        <form className="mt-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-semibold text-gray-700">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={handleChange}
              className="w-full py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter OTP"
              maxLength="6"
            />
          </div>

          {error && <p className="mt-2 text-sm text-center text-red-500">{error}</p>}
          {successMessage && <p className="mt-2 text-sm text-center text-green-500">{successMessage}</p>}

          <button
            type="submit"
            className="w-full px-4 py-2 mt-6 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
            disabled={isVerifying}
          >
            {isVerifying ? 'Verifying OTP...' : 'Verify OTP'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={handleResendOtp}
            className="text-blue-600 hover:underline disabled:text-gray-400"
            disabled={isResending}
          >
            {isResending ? 'Resending OTP...' : 'Resend OTP'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;

