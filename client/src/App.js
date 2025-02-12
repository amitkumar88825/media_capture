import React, { } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import Header from './components/navbar/Header';
import Login from "./components/auth/Login";
import Signup from "./components/auth/SignUp";
import Media from "./components/media/Media";
import NotFound from "./components/NotFound";
import WelcomePage from "./components/WelcomePage";


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/media" element={<Media />} />
        <Route path="/" element={<WelcomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;