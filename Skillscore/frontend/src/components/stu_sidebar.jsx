import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/skillscore_logo.png";
import "./stu_sidebar.css"; // Sidebar styles

const Sidebar = ({ role }) => {
  const navigate = useNavigate();
  const location = useLocation(); 

  const handleLogout = async () => {
    try {
        const response = await fetch("http://localhost:8080/api/auth/logout", {
            method: "POST",
            credentials: "include", // Ensure session cookies are sent
        });

        if (!response.ok) {
            throw new Error("Logout failed");
        }

        sessionStorage.clear();
        localStorage.removeItem("authToken"); 

        navigate("/login");
    } catch (error) {
        console.error("Error during logout:", error);
    }
};

  return (
    <aside className="dashboard-sidebar">
      <div className="dashboard-left-panel">
        <img src={logo} alt="SkillScore Logo" className="dashboard-logo" />
        <span className="logo-text">SkillScore</span>
      </div>
      <nav className="dashboard-nav">
        <ul>
          <li 
            className={location.pathname === "/StudentDashboard" ? "dashboard-active" : ""}
            onClick={() => navigate("/StudentDashboard")}
          >
            Dashboard
          </li>
          <li 
            className={location.pathname === "/Profile" ? "dashboard-active" : ""}
            onClick={() => navigate("/Profile")}
          >
            Profile
          </li>
          <li 
            className={location.pathname === "/Events" ? "dashboard-active" : ""}
            onClick={() => navigate("/Events")}
          >
            Events
          </li>
          
            <li 
              className={location.pathname === "/request" ? "dashboard-active" : ""}
              onClick={() => navigate("/request")}
            >
              Requests
            </li>
         
          </ul>
             
              
      </nav>
      <button className="dashboard-logout-btn" onClick={handleLogout}>
        <FaSignOutAlt /> Logout
      </button>
    </aside>
  );
};

export default Sidebar;