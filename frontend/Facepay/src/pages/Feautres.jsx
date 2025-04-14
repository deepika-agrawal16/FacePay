import React from "react";
import { FaShoppingCart, FaCreditCard, FaMoneyCheckAlt } from "react-icons/fa";
import illustration from "../images/features.svg";

const features = [
  {
    icon: <FaShoppingCart className="text-4xl text-blue-500" />,
    title: "No Cash or Cards Needed",
    description:
      "You don't need to carry money, mobile, or cards. Shop effortlessly using FacePay.",
  },
  {
    icon: <FaCreditCard className="text-4xl text-blue-500" />,
    title: "One-Step Online Checkout",
    description:
      "Shop online without entering debit/credit card details. Just a single step for payments.",
  },
  {
    icon: <FaMoneyCheckAlt className="text-4xl text-blue-500" />,
    title: "Banking Access in Rural Areas",
    description:
      "Enabling banking transactions without the complexity of card handling and OTP maintenance.",
  },
];

const Features = () => {
  return (
    <div className="px-6 py-16 bg-white">
      {/* Heading */}
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-gray-800">Our Features</h2>
      </div>

      {/* Content Section */}
      <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
        {/* Left Side - Features */}
        <div className="flex flex-col w-full gap-8 md:w-1/2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="p-4 bg-gray-100 rounded-full">{feature.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side - Illustration */}
        <div className="flex justify-center w-full md:w-1/2">
          <img
            src={illustration}
            alt="Features Illustration"
            className="w-full max-w-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Features;
