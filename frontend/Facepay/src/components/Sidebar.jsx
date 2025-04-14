import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars, faUser, faBuildingColumns, faExchangeAlt,
  faHistory, faCog, faSignOutAlt, faCamera, faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  // Load saved image from localStorage on component mount
  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  // Handle new profile image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result;
        setProfileImage(base64Image);
        localStorage.setItem("profileImage", base64Image);

        try {
          await axios.put("/api/user/profile-image", { image: base64Image });
        } catch (err) {
          console.error("Error uploading image to server:", err.message);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex">
      {/* Toggle Button */}
      <div className="p-4 shadow-md bg-gradient-to-b from-blue-200 to-blue-100">
        <button onClick={() => setIsOpen(!isOpen)}>
          <FontAwesomeIcon icon={faBars} className="text-2xl text-blue-800" />
        </button>
      </div>

      {/* Sidebar Content */}
      {isOpen && (
        <div className="flex flex-col justify-between w-64 min-h-screen p-4 shadow-md bg-gradient-to-b from-blue-200 to-blue-50">
          {/* Profile */}
          <div>
            <div className="relative flex flex-col items-center mb-6">
              <div className="relative">
                <img
                  src={profileImage || "/default-avatar.png"}
                  alt="Profile"
                  className="object-cover w-24 h-24 border-2 border-blue-500 rounded-full"
                />
                <label
                  htmlFor="profileUpload"
                  className="absolute bottom-0 right-0 p-1 bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700"
                  title="Change Profile Picture"
                >
                  <FontAwesomeIcon icon={faCamera} className="text-xs text-white" />
                  <input
                    type="file"
                    id="profileUpload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <h3 className="mt-2 text-lg font-semibold text-blue-700">Deepika Agrawal</h3>
            </div>

            {/* Navigation Menu */}
            <nav className="flex flex-col gap-4 font-medium text-gray-800">
              <SidebarItem icon={faSearch} title="Search" />
              <SidebarItem icon={faUser} title="User Details" onClick={() => navigate("/profile")} />
              <SidebarItem icon={faBuildingColumns} title="Bank Details" />
              <SidebarItem icon={faExchangeAlt} title="Transfer Options" />
              <SidebarItem icon={faHistory} title="Transaction History" />
              <div className="h-3"></div>
              <SidebarItem icon={faSignOutAlt} title="Logout" />
              <SidebarItem icon={faCog} title="Settings" />
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

const SidebarItem = ({ icon, title, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-3 px-3 py-2 rounded hover:text-blue-700 hover:bg-blue-100"
  >
    <FontAwesomeIcon icon={icon} className="text-lg" />
    <span>{title}</span>
  </button>
);

export default Sidebar;
