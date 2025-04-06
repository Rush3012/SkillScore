import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
; // Ensure this exists

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="content fade-in">
        {/* <img src={nitImage} alt="NIT Calicut" className="nit-image zoom-in" /> */}

        <div className="logo-section bounce">
          {/* <img src={logo} alt="SkillScore Logo" className="logo" /> */}
          <h1 className="website-name slide-in">Welcome to SkillScore</h1>
          <p className="tagline slide-in">Empowering students by tracking their achievements.</p>
        </div>

        <div className="login-buttons fade-in">
          <button className="user-login pulse" onClick={() => navigate("/login")}>
            User Login
          </button>
          <button className="admin-login pulse" onClick={() => navigate("/admin-login")}>
            Admin Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;