import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import './index.css';
import Header from './components/navbar/Header';
import Login from "./components/auth/Login";
import Signup from "./components/auth/SignUp";
import Media from "./components/media/Media";
import NotFound from "./components/NotFound";
import WelcomePage from "./components/WelcomePage";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    // Allow access to /login and /signup without redirection
    if (location.pathname !== "/login" && location.pathname !== "/signup") {
      if (user && user.name && user._id) {
        navigate("/media");
      } else {
        navigate("/");
      }
    }
  }, [navigate, location.pathname]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/media" element={<Media />} />
        <Route path="/" element={<WelcomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

// Wrapping App in Router to use useNavigate and useLocation
const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;