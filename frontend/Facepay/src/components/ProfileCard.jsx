// Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/");
    } else {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, [navigate]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-lg">
        Fetching your profile...
      </div>
    );

  const profileImageSrc =
    user?.profileImage ||
    localStorage.getItem("profileImage") ||
    `https://ui-avatars.com/api/?name=${user?.username || "User"}&background=0D8ABC&color=fff`;

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-2xl p-10 bg-white border border-gray-300 shadow-2xl rounded-3xl">
        <div className="flex flex-col items-center">
          <img
            src={profileImageSrc}
            alt="Profile"
            className="object-cover mb-5 border-4 border-indigo-500 rounded-full shadow-lg w-28 h-28"
          />
          <h2 className="mb-1 text-3xl font-bold text-gray-800">Hello, {user?.username || "User"} </h2>
          <p className="text-sm text-gray-500">Here’s your profile information</p>
        </div>

        <div className="px-6 mt-8 space-y-4 text-lg text-gray-700">
          <div className="flex justify-between">
            <span className="font-semibold">Email:</span>
            <span>{user?.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Username:</span>
            <span>{user?.username}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Mobile Number:</span>
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <button
          className="w-full px-5 py-3 mt-8 font-medium text-white transition bg-blue-600 rounded hover:bg-blue-700"
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
