import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/skillscore_logo.png";
import "./stu_sidebar.css"; // Sidebar styles

const Sidebar = ({ role }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Detect current URL path

  const handleLogout = async () => {
    try {
        // Call backend logout API if available
        const response = await fetch("http://localhost:8080/api/auth/logout", {
            method: "POST",
            credentials: "include", // Ensure session cookies are sent
        });

        if (!response.ok) {
            throw new Error("Logout failed");
        }

        // Clear session storage & local storage
        sessionStorage.clear();
        localStorage.removeItem("authToken"); // If you're using JWT storage

        // Redirect to login
        navigate("/");
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
          {role === "STUDENT" ? (
            <li 
              className={location.pathname === "/Requests" ? "dashboard-active" : ""}
              onClick={() => navigate("/Requests")}
            >
              Requests
            </li>
          ) : role === "FACULTY" ? (
            <>
              <li 
                className={location.pathname === "/ManageStudents" ? "dashboard-active" : ""}
                onClick={() => navigate("/ManageStudents")}
              >
                Manage Students
              </li>
              <li 
                className={location.pathname === "/Reports" ? "dashboard-active" : ""}
                onClick={() => navigate("/Reports")}
              >
                Reports
              </li>
            </>
          ) : null}
        </ul>
      </nav>
      <button className="dashboard-logout-btn" onClick={handleLogout}>
        <FaSignOutAlt /> Logout
      </button>
    </aside>
  );
};

export default Sidebar;