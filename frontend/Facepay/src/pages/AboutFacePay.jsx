import React from "react";
import { motion } from "framer-motion";
import facepayIllustration from "../images/face.jpg"; 
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const AboutFacePay = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-white">
      <NavBar />

      {/* Main Section */}
      <div className="flex flex-col items-center justify-between px-12 py-16 pt-28 md:flex-row">
        
        {/* Left Side: Image with Animation */}
        <motion.div 
          className="flex justify-center md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={facepayIllustration}
            alt="FacePay Illustration"
            className="w-[500px] h-auto rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Right Side: Text Content with Animation */}
        <motion.div 
          className="mt-10 text-gray-800 md:w-1/2 md:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold leading-tight">
            Payment made Easy. <br />
            Now you can pay Hassle-free
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            FacePay is a concept that provides an API for point-of-sale
            operations across multiple domains. This enables businesses to
            integrate AI-based facial recognition for seamless transactions.
          </p>
          <p className="mt-2 text-lg text-gray-600">
            This helps merchants speed up processes, enhances user convenience,
            and prevents fraudulent transactions.
          </p>
          <motion.button
            className="mt-6 text-lg font-semibold text-blue-600 hover:underline"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/about")}
          >
            About FacePay →
          </motion.button>
        </motion.div>

      </div>
    </div>
  );
};

export default AboutFacePay;
