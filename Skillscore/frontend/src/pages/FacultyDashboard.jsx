import React from "react";
import { FaUser, FaCalendarAlt, FaClipboardList, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./FacultyDashboard.css";
import logo from "../assets/skillscore_logo.png";


const FacultyDashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <img src={logo} alt="SkillScore" />
          <h2>SkillScore</h2>
        </div>
        <ul>
          <li className="active">
            <FaClipboardList /> <Link to="/faculty-dashboard">Dashboard</Link>
          </li>
          <li>
            <FaUser /> <Link to="/students">Students</Link>
          </li>
          <li>
            <FaCalendarAlt /> <Link to="/events">Events</Link>
          </li>
          <li>
            <FaClipboardList /> <Link to="/requests">Requests</Link>
          </li>
        </ul>
        <button className="logout">
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="faculty-header">
          <div className="header-content">
            <h1>Welcome Renjith !!</h1>
          </div>
          <div className="profile">
            <span>Thursday, May 16, 2024</span>
            <div className="profile-info">
              <img src="/faculty-profile.jpg" alt="Faculty" />
              <div className="faculty-details">
                <h4>Renjith R</h4>
                <p>Faculty</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="dashboard-cards">
          <div className="card">
            <h3>Total Students</h3>
            <p className="count">40</p>
          </div>
          <div className="card highlight">
            <h3>Students Below Credit</h3>
            <p className="count red">60%</p>
            <span>24 Students</span>
          </div>
          <div className="card">
            <h3>Requests</h3>
            <p className="count">17</p>
            <span>11 to be approved</span>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="dashboard-section">
          <h2>Tasks</h2>
          <div className="task-list">
            <div className="task-item">
              <span className="task-icon">✔️</span>
              <div className="task-content">
                <p>Approval for NSS Camp Activity Points</p>
                <span>May 13, 2024</span>
              </div>
            </div>
            <div className="task-item warning">
              <span className="task-icon">⚠️</span>
              <div className="task-content">
                <p>Biometric Registration Pending</p>
                <span>May 13, 2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="dashboard-section">
          <h2>Upcoming Events</h2>
          <div className="events">
            <div className="event">
              <p className="event-title">Level-Up Seminar</p>
              <span>May 31, 2024</span>
            </div>
            <div className="event">
              <p className="event-title">Innovation Fair</p>
              <span>June 13, 2024</span>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
