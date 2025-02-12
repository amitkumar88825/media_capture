import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";


const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user) || JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    dispatch(logout()); 
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login");

  };

  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";
  const isHomePage = location.pathname === "/"; // Check if URL is "/"

  return (
    <nav className="flex justify-between items-center bg-blue-600 p-4 text-white shadow-md">
      <h1 className="text-xl font-bold">Media Capture and Storage</h1>
      <div className="flex items-center gap-4">
      <span className="font-semibold">
        {user?.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : ""}
      </span>
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