import React from "react";
import { Link } from "react-router-dom";
import "./fac_sidebar.css"; // Ensure the CSS file exists
import logo from "../assets/skillscore_logo.png"; // Import the SkillScore logo

const FacultySidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="SkillScore" className="logo-img" /> {/* SkillScore Logo */}
        <h2>SkillScore</h2>
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/FacultyDashboard"> Dashboard</Link>
        </li>
        <li>
          <Link to="/faculty-students"> Students</Link> {/* Faculty managing students */}
        </li>
        <li>
          <Link to="/FacultyEvents"> Events</Link>
        </li>
        <li>
          <Link to="/faculty-requests"> Requests</Link>
        </li>
      </ul>
      <button className="logout-btn"> Logout</button>
    </div>
  );
};

export default FacultySidebar;

