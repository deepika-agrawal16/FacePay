import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../images/log.svg";  // Adjust the path to your image if necessary
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.username || !formData.password) {
      return setError("All fields are required");
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      const user = response.data.user;

      // ✅ Store full user data (including profileImage) in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", response.data.token);  // Store token for authentication

      // ✅ Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data.message || "Login failed");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="items-center justify-center hidden w-1/2 bg-blue-100 md:flex">
        <img src={loginImage} alt="Login" className="w-3/4 h-auto" />
      </div>

      <div className="flex items-center justify-center w-full bg-blue-100 md:w-1/2">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-blue-600">Welcome Back!</h2>
          <p className="mt-2 text-center text-gray-600">Sign in to continue</p>

          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="relative">
              <label className="block font-semibold text-gray-700">Username</label>
              <div className="relative w-full">
                <FontAwesomeIcon icon={faUser} className="absolute text-gray-400 -translate-y-1 left-4 top-1/2" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  className="w-full py-2 pl-12 pr-4 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block font-semibold text-gray-700">Password</label>
              <div className="relative">
                <FontAwesomeIcon icon={faLock} className="absolute text-gray-400 -translate-y-1 left-4 top-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full py-2 pl-12 pr-10 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="absolute text-gray-400 -translate-y-1 cursor-pointer right-4 top-1/2"
                  onClick={togglePasswordVisibility}
                />
              </div>
              <div className="mt-2 text-right">
                <span
                  className="text-sm text-blue-600 cursor-pointer hover:underline"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password?
                </span>
              </div>
            </div>

            {error && <p className="mt-2 text-red-500">{error}</p>}

            <button
              type="submit"
              className="w-full px-4 py-2 mt-6 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
