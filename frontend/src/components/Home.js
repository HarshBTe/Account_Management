import React from "react";
import { useNavigate } from "react-router-dom";
import  '../styles/Home.css'

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Account Management App</h1>
      <div className="button-group">
        <button className="btn login-btn" onClick={handleLoginClick}>
          Login
        </button>
        <button className="btn register-btn" onClick={handleRegisterClick}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Home;