import React from "react";
import ContactImage from "../images/contact.png"; 
import NavBar from "./NavBar";

import Footer from "./Footer";

const ContactUs = ({ showHeading = true }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavBar />
      
      {/* Contact Section */}
      <div className="px-6 py-16">
        {/* Conditionally Render the Heading */}
        {showHeading && (
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold text-gray-800">Contact Us</h2>
          </div>
        )}

        <div className="flex items-center justify-center flex-grow px-6 pt-14">
          <div className="flex w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg bg-opacity-90">
            {/* Left Section - Contact Form */}
            <div className="w-1/2 pr-8">
              <h1 className="mb-4 text-2xl font-bold text-blue-600">Get in Touch!</h1>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="w-full py-2 text-white transition bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Right Section - Contact Image */}
            <div className="flex items-center justify-center w-1/2">
              <img src={ContactImage} alt="Contact" className="w-full h-auto rounded-md" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    
  );
};

export default ContactUs;
