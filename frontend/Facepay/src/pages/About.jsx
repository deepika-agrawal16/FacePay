import React from "react";
import AboutImage from "../images/signUp.jpeg"; 
import { motion } from "framer-motion";
import NavBar from "./NavBar";
import Footer from "./Footer";
import {  useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen bg-blue-100">
    <NavBar />
    <div className="flex flex-col items-center justify-center min-h-screen pt-12 bg-gray-100">
      <div className="container px-6 py-10 mx-auto">
        <div className="grid items-center grid-cols-1 gap-10 md:grid-cols-2">
          
          {/* Left Side - Image */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img src={AboutImage} alt="Face Recognition Payment" className="w-full max-w-md rounded-lg shadow-lg" />
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            className="text-gray-800"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mb-4 text-4xl font-extrabold text-blue-600">FacePay: The Future of Payments</h2>
            <p className="text-lg leading-relaxed">
              FacePay India revolutionizes digital transactions by integrating facial recognition with POS systems, enabling 
              seamless and secure payments using just your face and a PIN. This innovative approach ensures convenience and 
              enhanced security for customers.
            </p>
            <p className="mt-4 text-lg leading-relaxed">
            Our technology supports various implementations—from a bank account requiring no additional infrastructure to an 
            advanced POS integration with facial recognition capabilities.
            </p>
            <button className="px-6 py-3 mt-6 text-lg font-semibold text-white transition bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
            onClick={() => navigate('/')}>
              Learn More
            </button>
          </motion.div>
          
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default About;
