import { useEffect, useState } from "react";
import axios from "axios";

const ProfileCard = () => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState("/default-avatar.png");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/user/me");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    };

    // Fetch user details from backend
    fetchUser();

    // Get profile image from localStorage if available
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  return (
    <div className="flex max-w-4xl p-6 mx-auto mt-10 bg-white rounded-lg shadow-lg">
      <div className="flex-shrink-0 w-1/3">
        <img
          src={profileImage}
          alt="User"
          className="object-cover w-40 h-40 border-4 border-blue-500 rounded-full"
        />
      </div>
      <div className="w-2/3 ml-6">
        <h2 className="mb-4 text-2xl font-bold text-blue-700">User Profile</h2>
        {user ? (
          <>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
            <p><strong>Password:</strong> {user.password}</p>
          </>
        ) : (
          <p>Loading user info...</p>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
