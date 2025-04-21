import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import paymentImage from "../images/dashboard1.jpg";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-blue-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Top navbar */}
        <Navbar />

        {/* Main area */}
        <div className="flex items-center justify-center flex-1 p-8">
          {/* Left Image */}
          <div className="flex justify-center w-1/2">
            <img
              src={paymentImage}
              alt="payment"
              className="w-[550px] h-[400px] object-contain"
            />
          </div>

          {/* Right Welcome Text */}
          <div className="flex flex-col items-start justify-center w-1/2 px-8">
            <h1 className="mb-4 text-4xl font-bold text-blue-700">
              Hello! Welcome to FacePay!
            </h1>
            <p className="mb-3 text-lg text-gray-600">Do you need any help?</p>
            <input
              type="text"
              placeholder="Search here..."
              className="w-full max-w-md px-4 py-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
