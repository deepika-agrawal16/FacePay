import logo from "../images/logo image.png";
import profileImage from "../images/deepika.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faBell } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white shadow-md">
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="FacePay Logo" className="w-32 h-auto" />
      </div>

      {/* Right: Profile + Actions */}
      <div className="flex items-center gap-4">
        {/* Notification Icon */}
        <FontAwesomeIcon icon={faBell} className="text-lg text-gray-600 cursor-pointer hover:text-blue-600" />

        {/* Profile Picture */}
        <img
          src={profileImage}
          alt="Profile"
          className="object-cover border-2 border-blue-500 rounded-full w-9 h-9"
        />

        {/* Logout Button */}
        <button className="flex items-center gap-2 px-3 py-1.5 text-white bg-blue-600 rounded hover:bg-blue-700 transition">
          <FontAwesomeIcon icon={faRightFromBracket} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
