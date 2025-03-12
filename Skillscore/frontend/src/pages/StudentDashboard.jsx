import React from "react";
import { FaCalendarAlt, FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/skillscore_logo.png";
import "./StudentDashboard.css"; // Import the CSS file
import propic from "../assets/Student_image.jpeg";

const data = [
  { name: "Institute Points", value: 21, color: "#4A90E2" },
  { name: "Cultural Points", value: 31, color: "#F5A623" },
];

const totalPoints = 52;
const maxPoints = 80;
const pendingRequests = 2;

const events = [
  { title: "AI Bootcamp", date: "March 13 at 10:30 AM" },
  { title: "NSS Camp", date: "March 19 from 8:00 AM to 5:00 PM" },
  { title: "Ragam Workshop", date: "March 12 at 2:30 PM" },
];

export default function StudentDashboard() {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="dashboard-left-panel">
          <img src={logo} alt="SkillScore Logo" className="dashboard-logo" />
          <span className="logo-text">SkillScore</span>
        </div>
        <nav className="dashboard-nav">
          <ul>
            <li className="dashboard-active">Dashboard</li>
            <li>Profile</li>
            <li>Events</li>
            <li>Requests</li>
          </ul>
        </nav>
        <button className="dashboard-logout-btn">
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main-content">
        {/* Header */}
        <header className="dashboard-header">
          <h1>Welcome Rushda !!!</h1>
          <div className="dashboard-profile">
            <span>Rushda P P</span>
            <div className="dashboard-profile-info">
              <img
                src={propic}
                alt="Rushda P P"
                className="dashboard-profile-pic"
              />
            </div>
          </div>
        </header>

        {/* Points Summary & Events */}
        <div className="dashboard-content-wrapper">
          {/* Points Section */}
          <div className="dashboard-points-summary">
            <h2>Total Points</h2>
            <h1>
              {totalPoints}/{maxPoints}
            </h1>
            <div className="dashboard-point-breakdown">
              <div className="dashboard-point-item dashboard-institute-points">
                <p>21/40</p>
                <span>Institute Points</span>
              </div>
              <div className="dashboard-point-item dashboard-cultural-points">
                <p>31/40</p>
                <span>Cultural Points</span>
              </div>
              <div className="dashboard-point-item dashboard-pending-requests">
                <p>{pendingRequests}</p>
                <span>Pending Requests</span>
              </div>
            </div>
            <button className="dashboard-submit-btn">Submit New Request</button>
          </div>

          {/* Upcoming Events Section */}
          <div className="dashboard-upcoming-events">
            <h3>Upcoming Events</h3>
            <ul>
              {events.map((event, index) => (
                <li key={index}>
                  <FaCalendarAlt className="dashboard-event-icon" />
                  <div>
                    <p className="dashboard-event-title">{event.title}</p>
                    <p className="dashboard-event-date">{event.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
