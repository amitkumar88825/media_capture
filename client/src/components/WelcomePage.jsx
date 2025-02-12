import React from "react";

const WelcomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          📸 Welcome to the Media Library!
        </h1>
        <p className="text-gray-600 text-lg">
          Easily add and manage your media items. Navigate to the{" "}
          <strong className="text-blue-500">Add Media</strong> tab to get started.
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;