import React, { useState } from "react";
import './index.css';
import Header from './components/navbar/Header';
import Login from "./components/auth/Login";
import Signup from "./components/auth/SignUp";


const  App = () => {

  const [ windowName, setWindowName ] = useState('login');

  return (
    <div>
      <Header windowName={windowName} setWindowName={setWindowName} />
      {  windowName === 'login' ? <Login /> : <Signup /> }
    </div>
  );
}

export default App;
