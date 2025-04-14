import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import signupImage from '../images/register.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faPhone,
  faLock,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
    setSuccessMessage('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateInputs = () => {
    const { username, email, phoneNumber, password } = formData;

    if (!username || !email || !phoneNumber || !password) {
      return 'All fields are required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Invalid email format';
    }

    const phoneRegex = /^[0-9]{10}$/; // Consider more robust phone validation.
    if (!phoneRegex.test(phoneNumber)) {
      return 'Phone number must be 10 digits';
    }

    if (password.length < 8) {
      return 'Password must be at least 8 characters';
    }

    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateInputs();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setSuccessMessage(response.data.message);
       // Display success message
       localStorage.setItem('email', formData.email); // Store email for OTP verification
      setTimeout(() => {
        navigate('/verify'); // Redirect after a short delay
      },0);

    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
        console.error('Signup error:', err);
      }
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex items-center justify-center w-full bg-blue-100 md:w-1/2">
        <div className="w-[80%] max-w-3xl p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-blue-600">
            Create an Account
          </h2>
          <p className="mt-2 text-center text-gray-600">Join us today!</p>

          <form className="mt-4" onSubmit={handleSubmit}>
            <div>
              <label className="block font-semibold text-gray-700">
                Username
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faUser}
                  className="absolute text-gray-400 transform -translate-y-1 left-4 top-1/2"
                />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  className="w-full pl-12 pr-4 py-1.5 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="mt-2">
              <label className="block font-semibold text-gray-700">Email</label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute text-gray-400 transform -translate-y-1 left-4 top-1/2"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-1.5 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="mt-2">
              <label className="block font-semibold text-gray-700">
                Phone Number
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="absolute text-gray-400 transform -translate-y-1 left-4 top-1/2"
                />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full pl-12 pr-4 py-1.5 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="mt-2">
              <label className="block font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute text-gray-400 transform -translate-y-1 left-4 top-1/2"
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-10 py-1.5 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="absolute text-gray-400 transform -translate-y-1 cursor-pointer right-4 top-1/2"
                  onClick={togglePasswordVisibility}
                />
              </div>
            </div>

            {error && (
              <p className="mt-2 text-sm text-center text-red-500">{error}</p>
            )}
            {successMessage && (
              <p className="mt-2 text-sm text-center text-green-500">{successMessage}</p>
            )}

            <button
              type="submit"
              className="w-full px-4 py-2 mt-6 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Already have an account?{' '}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          </p>
        </div>
      </div>

      <div className="items-center justify-center hidden w-1/2 bg-blue-100 md:flex">
        <img src={signupImage} alt="Signup" className="w-3/4 h-auto" />
      </div>
    </div>
  );
};

export default Signup;