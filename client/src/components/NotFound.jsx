import React from "react";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Page Not Found</h2>
        <p className="text-center text-red-500">The page you are looking for does not exist</p>
      </div>
    </div>
  );
};

export default NotFound;