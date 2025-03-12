import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaSignOutAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import logo from "../assets/skillscore_logo.png";
import "./StudentDashboard.css";
import propic from "../assets/Student_image.jpeg";

export default function StudentDashboard() {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useParams();
  


  useEffect(() => {
    if (!userId) {
      setError("Invalid Student ID");
      setLoading(false);
      return;
    }
    const extractedUserId = userId?.split("=")[1]; // Gets "1"

    const formattedUserId = parseInt(extractedUserId, 10); // Convert userId to number

    fetch(`http://localhost:8080/student/dashboard/${formattedUserId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch student data");
        }
        return res.json();
      })
      .then((data) => {
        setStudentData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching student data:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleLogout = () => {
    // Remove authentication token (if stored in localStorage/sessionStorage)
    localStorage.removeItem("authToken"); // Adjust based on your auth mechanism
    sessionStorage.removeItem("authToken");
  
    // Optionally, clear other user-related data
    localStorage.removeItem("userId"); // If you store userId
    sessionStorage.removeItem("userRole");
  
    // Redirect to login page
    window.location.href = "/"; // Redirects user to login
  };

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
        <button className="dashboard-logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main-content">
        {/* Header */}
        <header className="dashboard-header">
          <h1>Welcome {studentData.name} !!!</h1>
          <div className="dashboard-profile">
            <span>{studentData.name}</span>
            <div className="dashboard-profile-info">
              <img
                src={propic}
                alt={studentData.name}
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
            <h1>{studentData.totalPoints}/80</h1>
            <div className="dashboard-point-breakdown">
              <div className="dashboard-point-item dashboard-institute-points">
                <p>--/40</p>
                <span>Institute Points</span>
              </div>
              <div className="dashboard-point-item dashboard-cultural-points">
                <p>--/40</p>
                <span>Cultural Points</span>
              </div>
              <div className="dashboard-point-item dashboard-pending-requests">
                <p>--</p>
                <span>Pending Requests</span>
              </div>
            </div>
            <button className="dashboard-submit-btn">Submit New Request</button>
          </div>

          {/* Upcoming Events Section */}
          <div className="dashboard-upcoming-events">
            <h3>Upcoming Events</h3>
            <ul>
              <li>
                <FaCalendarAlt className="dashboard-event-icon" />
                <div>
                  <p className="dashboard-event-title">AI Bootcamp</p>
                  <p className="dashboard-event-date">March 13 at 10:30 AM</p>
                </div>
              </li>
              <li>
                <FaCalendarAlt className="dashboard-event-icon" />
                <div>
                  <p className="dashboard-event-title">NSS Camp</p>
                  <p className="dashboard-event-date">
                    March 19 from 8:00 AM to 5:00 PM
                  </p>
                </div>
              </li>
              <li>
                <FaCalendarAlt className="dashboard-event-icon" />
                <div>
                  <p className="dashboard-event-title">Ragam Workshop</p>
                  <p className="dashboard-event-date">March 12 at 2:30 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
