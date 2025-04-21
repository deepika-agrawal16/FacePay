import React from "react";
import Logo from "../images/logo image.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignInAlt } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed z-10 w-full bg-white shadow-md">
      <div className="container flex items-center justify-between px-6 py-4 mx-auto">
        
        {/* Logo */}
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="h-10 mr-6" />
        </div>

        {/* Navigation Links */}
        <div className="hidden space-x-8 md:flex">
          <a
            href="#"
            className="font-semibold text-gray-600 hover:text-blue-600"
            onClick={() => navigate("/")}
          >
            Home
          </a>
          <a href="#" className="font-semibold text-gray-600 hover:text-blue-600"
          onClick={() => navigate("/login")}>
            Products
          </a>
          <a href="#" className="font-semibold text-gray-600 hover:text-blue-600" 
          onClick={() => navigate("/about")}>
            About
          </a>
          <a href="#" className="font-semibold text-gray-600 hover:text-blue-600"
          onClick={() => navigate("/services")}>
            Services
          </a>
          <a
            href="#"
            className="font-semibold text-gray-600 hover:text-blue-600"
            onClick={() => navigate("/contact")}
          >
            Contact
          </a>
        </div>

        {/* Login & Signup */}
        <div className="flex items-center space-x-6">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center font-semibold text-gray-600 hover:text-blue-600"
          >
            <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="flex items-center px-4 py-2 text-blue-600 transition border-2 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white"
          >
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
