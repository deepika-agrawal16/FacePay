import React from "react";
import { motion } from "framer-motion";
import product1 from "../images/product1.jpeg";
import product2 from "../images/product2.jpeg";
import product3 from "../images/product3.png";
import NavBar from "./NavBar";
import Footer from "./Footer";

const services = [
  {
    id: 1,
    image: product1,
    title: "Facial Recognition Payments",
    description:
      "Our advanced facial recognition payment system allows customers to pay securely and effortlessly using their face. No need for cash, cards, or mobile phones—just a quick face scan and PIN authentication ensure seamless transactions.",
    reverse: false,
  },
  {
    id: 2,
    image: product2,
    title: "AI-Powered Payment Integration",
    description:
      "We provide AI-powered APIs that integrate with mobile apps, desktop applications, and POS systems. This enables businesses to implement secure, efficient, and contactless payment solutions powered by facial recognition technology.",
    reverse: true,
  },
  {
    id: 3,
    image: product3,
    title: "Enhanced Security & Authentication",
    description:
      "With our facial recognition-based authentication, businesses can prevent fraud and unauthorized transactions. This service ensures only verified individuals can make payments, increasing security and customer trust.",
    reverse: false,
  },
];

const Services = () => {
  return (
    <div className='relative w-full h-screen bg-gradient-to-r from-blue-600 to-blue-400'>
      <NavBar />
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="container px-6 py-16 pt-18 mxmb-auto">
        <motion.h2
          className="mb-12 text-4xl font-extrabold text-center text-blue-600"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
         
        </motion.h2>

        {services.map((service, index) => (
          <div
            key={service.id}
            className={`flex flex-col md:flex-row items-center justify-between gap-10 mb-16 ${
              service.reverse ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image Section */}
            <motion.div
              className="flex justify-center md:w-1/2"
              initial={{ opacity: 0, x: service.reverse ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full max-w-md rounded-lg shadow-lg"
              />
            </motion.div>

            {/* Content Section */}
            <motion.div
              className="text-gray-800 md:w-1/2"
              initial={{ opacity: 0, x: service.reverse ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="mb-4 text-3xl font-semibold">{service.title}</h3>
              <p className="text-lg leading-relaxed">{service.description}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default Services;
