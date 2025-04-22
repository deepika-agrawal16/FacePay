import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
  faBuildingColumns,
  faExchangeAlt,
  faHistory,
  faCog,
  faSignOutAlt,
  faCamera,
  faSearch,
  faMobileAlt,
  faMoneyCheckAlt,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [user, setUser] = useState(null);
  const [showTransferOptions, setShowTransferOptions] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setProfileImage(parsedUser.profileImage || localStorage.getItem("profileImage"));
    }
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const imageBase64 = reader.result;
      setProfileImage(imageBase64);
      localStorage.setItem("profileImage", imageBase64);

      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const email = storedUser?.email;
        if (!email) {
          console.error("User email not found in localStorage.");
          return;
        }

        const response = await axios.put("http://localhost:5000/api/auth/profile-image", {
          image_url: imageBase64,
          email,
        });

        const updatedImage = response?.data?.image_url;
        if (updatedImage) {
          setProfileImage(updatedImage);
          const updatedUser = { ...storedUser, profileImage: updatedImage };
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }

        console.log("Profile image updated successfully.");
      } catch (error) {
        console.error("Error uploading image:", error.message);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex">
      {/* Toggle Button */}
      <div className="p-4 shadow-md bg-gradient-to-b from-blue-200 to-blue-100">
        <button onClick={() => setIsOpen(!isOpen)}>
          <FontAwesomeIcon icon={faBars} className="text-2xl text-blue-800" />
        </button>
      </div>

      {/* Sidebar */}
      {isOpen && (
        <div className="flex flex-col w-64 min-h-screen p-4 shadow-md bg-gradient-to-b from-blue-200 to-blue-50">
          {/* Profile */}
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
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
            <h3 className="mt-2 text-lg font-semibold text-blue-700">
              {user?.username || "User"}
            </h3>
          </div>

          {/* Menu */}
          <nav className="flex flex-col gap-4 font-medium text-gray-800">
            <SidebarItem icon={faSearch} title="Search" />
            <SidebarItem icon={faUser} title="User Details" onClick={() => navigate("/profile")} />
            <SidebarItem icon={faBuildingColumns} title="Bank Details" onClick={() => navigate("/bankdetails")} />

          
            <SidebarItem
              icon={faExchangeAlt}
              title="Transfer Options"
              isParent
              onClick={() => setShowTransferOptions(!showTransferOptions)}
              isOpen={showTransferOptions}
            />
            {showTransferOptions && (
              <div className="flex flex-col gap-2 ml-8">
                <SidebarItem icon={faMobileAlt} title="UPI Transaction" onClick={() => navigate("/upi")} />
                <SidebarItem icon={faMoneyCheckAlt} title="Bank Transfer" onClick={() => navigate("/bank-transfer")} />
              </div>
            )}

            <SidebarItem icon={faHistory} title="Transaction History" onClick={() => navigate("/history")} />
            <div className="h-3" />
            <SidebarItem icon={faSignOutAlt} title="Logout" onClick={handleLogout} />
            <SidebarItem icon={faCog} title="Settings" />
          </nav>
        </div>
      )}
    </div>
  );
};


const SidebarItem = ({ icon, title, onClick, isParent = false, isOpen = false }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-between w-full px-3 py-2 rounded hover:text-blue-700 hover:bg-blue-100"
  >
    <div className="flex items-center gap-3">
      <FontAwesomeIcon icon={icon} className="text-lg" />
      <span>{title}</span>
    </div>
    {isParent && (
      <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} className="text-sm text-gray-500" />
    )}
  </button>
);

export default Sidebar;

