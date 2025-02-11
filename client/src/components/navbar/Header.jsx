import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    navigate("/login"); 
  };

  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";


  return (
    <nav className="flex justify-between bg-blue-600 p-4 text-white">
      <h1 className="text-xl font-bold">Media Capture and Storage Web Application</h1>
      <div>
        {isAuthPage ? (
          <>
            {location.pathname !== "/login" && <Link to="/login" className="mr-4">Login</Link>}
            {location.pathname !== "/signup" && <Link to="/signup">Sign Up</Link>}
          </>
        ) : (
          <button className="bg-red-500 px-4 py-2 rounded" onClick={() => handleLogout()}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;