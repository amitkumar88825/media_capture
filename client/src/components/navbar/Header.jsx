import React from 'react';

const Header = ({ windowName, setWindowName }) => {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Media Capture App</h1>
        <nav>
          <ul className="flex space-x-6">
            {windowName === 'login' ? (
              <li>
                <a 
                  href="#" 
                  className="hover:text-gray-300" 
                  onClick={(e) => {
                    e.preventDefault();
                    setWindowName('signup');
                  }}
                >
                  Sign Up
                </a>
              </li>
            ) : (
              <li>
                <a 
                  href="#" 
                  className="hover:text-gray-300" 
                  onClick={(e) => {
                    e.preventDefault();
                    setWindowName('login');
                  }}
                >
                  Login
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;