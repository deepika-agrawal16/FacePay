// Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadButton } from "@uploadthing/react"

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-10 border border-gray-300">
        <div className="flex flex-col items-center">
          <img
            src={profileImageSrc}
            alt="Profile"
            className="w-28 h-28 rounded-full shadow-lg mb-5 object-cover border-4 border-indigo-500"
          />
          <h2 className="text-3xl font-bold text-gray-800 mb-1">Hello, {user?.username || "User"} </h2>
          <p className="text-gray-500 text-sm">Here’s your profile information</p>
        </div>

        <div className="mt-8 space-y-4 text-gray-700 text-lg px-6">
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
          className="w-full px-5 py-3 mt-8 text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 font-medium transition"
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
