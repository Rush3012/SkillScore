import React from "react";
import FacultySidebar from "../components/fac_sidebar";
import FacultyHeader from "../components/fac_header";
import "./FacultyDashboard.css";

const FacultyDashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Faculty Sidebar */}
      <FacultySidebar />

      {/* Main Content */}
      <div className="main-content">
        {/* Faculty Header */}
        <FacultyHeader name="Renjith R" date="Thursday, May 16, 2024" />

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
              <span className="task-icon"></span>
              <div className="task-content">
                <p>Approval for NSS Camp Activity Points</p>
                <span>May 13, 2024</span>
              </div>
            </div>
            <div className="task-item warning">
              <span className="task-icon"></span>
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
