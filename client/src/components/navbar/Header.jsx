import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";
  const isHomePage = location.pathname === "/"; // Check if URL is "/"

  return (
    <nav className="flex justify-between items-center bg-blue-600 p-4 text-white shadow-md">
      <h1 className="text-xl font-bold">Media Capture and Storage</h1>
      <div>
        {isAuthPage || isHomePage ? (
          <>
            <Link to="/login" className="mr-4 hover:underline">
              Login
            </Link>
            <Link to="/signup" className="hover:underline">
              Sign Up
            </Link>
          </>
        ) : (
          <button
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;