import React from "react";
import { FaEnvelope, FaPhone, FaGithub, FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-10 text-white bg-gradient-to-r from-blue-600 to-blue-900">
      <div className="container px-6 mx-auto">
        {/* Top Section */}
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          <h2 className="mb-4 text-2xl font-bold md:mb-0">FacePay</h2>
          <div className="flex space-x-6 text-lg">
            {/* Social Icons */}
            <a href="mailto:deepikaagrawal1572@gmail.com" className="hover:text-gray-300">
              <FaEnvelope size={24} />
            </a>
            <a href="tel:+917773800506" className="hover:text-gray-300">
              <FaPhone size={24} />
            </a>
            <a href="https://github.com/yourgithub" className="hover:text-gray-300">
              <FaGithub size={24} />
            </a>
            <a href="https://instagram.com/yourinstagram" className="hover:text-gray-300">
              <FaInstagram size={24} />
            </a>
            <a href="https://twitter.com/yourtwitter" className="hover:text-gray-300">
              <FaTwitter size={24} />
            </a>
            <a href="https://facebook.com/yourfacebook" className="hover:text-gray-300">
              <FaFacebook size={24} />
            </a>
          </div>
        </div>

        {/* Divider Line */}
        <div className="my-6 border-t border-gray-400"></div>

        {/* Bottom Section */}
        <div className="text-sm text-center text-gray-300">
          <p>© {new Date().getFullYear()} FacePay. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
