import React from "react";
import { motion } from "framer-motion";
import slider1 from "../images/slider1.png"; // Adjust paths as per your project structure
import slider2 from "../images/slider2.png";
import slider3 from "../images/slider3.png";

const features = [
  {
    img: slider1,
    title: "Seamless Transactions",
    desc: "Experience effortless and secure transactions with FacePay.",
  },
  {
    img: slider2,
    title: "Advanced Security",
    desc: "Your face is your key – ensuring the highest level of protection.",
  },
  {
    img: slider3,
    title: "Instant Payments",
    desc: "Make payments instantly without carrying cards or cash.",
  },
];

const HomeScorable = () => {
  return (
    <div className="py-12 bg-gray-100">
      {/* Header Section */}
      <div className="px-6 mb-8 text-center">
        <h2 className="text-4xl font-bold text-gray-800">
          Do More with Digital Payments
        </h2>
        <p className="mt-2 text-lg text-gray-600">
          Get a power-packed suite of payment solutions that will help you run your business conveniently.
        </p>
      </div>

      {/* Cards Section */}
      <div className="flex flex-wrap justify-center gap-8 px-6 pt-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden bg-white shadow-lg cursor-pointer w-80 h-96 rounded-xl hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={feature.img}
              alt={feature.title}
              className="object-cover w-full h-56"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{feature.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HomeScorable;