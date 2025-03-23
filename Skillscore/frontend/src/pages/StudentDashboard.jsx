import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import Sidebar from "../components/stu_sidebar";
import Header from "../components/stu_header";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "./StudentDashboard.css";

const events = [
  { title: "AI Bootcamp", date: "March 13 at 10:30 AM" },
  { title: "NSS Camp", date: "March 19 from 8:00 AM to 5:00 PM" },
  { title: "Ragam Workshop", date: "March 12 at 2:30 PM" },
];

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [role, setRole] = useState("STUDENT");

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    if (userRole) setRole(userRole);
  }, []);

  // Points Data
  const totalPoints = 52;
  const institutePoints = 21;
  const culturalPoints = 31;
  const pendingRequests = 2;

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar role={role} />

      {/* Main Content */}
      <main className="dashboard-main-content">
        {/* Header */}
        <Header />

        {/* Welcome Message & Date */}
        <div className="dashboard-header">
          <h1 className="welcome-message">Welcome Rushda !!!</h1>
          <p className="dashboard-date">{new Date().toDateString()}</p>
        </div>

        <div className="dashboard-content-wrapper">
          {/* Points Section */}
          <div className="dashboard-points-summary">
            {/* Circular Progress Bar for Total Points */}
            <div className="circular-progress-container">
              <CircularProgressbar
                value={totalPoints}
                maxValue={80}
                text={`${totalPoints}/80`}
                styles={buildStyles({
                  textSize: "18px",
                  pathColor: "#4caf50",
                  textColor: "#000",
                  trailColor: "#e0e0e0",
                })}
              />
            </div>
            <h3>Total Points</h3>

            <div className="dashboard-point-breakdown">
              {/* Institute Points */}
              <div className="dashboard-point-item">
                <div className="circular-progress-small">
                  <CircularProgressbar
                    value={institutePoints}
                    maxValue={40}
                    text={`${institutePoints}/40`}
                    styles={buildStyles({
                      textSize: "14px",
                      pathColor: "#2196f3",
                      textColor: "#000",
                      trailColor: "#e0e0e0",
                    })}
                  />
                </div>
                <p>Institute Points</p>
              </div>

              {/* Cultural Points */}
              <div className="dashboard-point-item">
                <div className="circular-progress-small">
                  <CircularProgressbar
                    value={culturalPoints}
                    maxValue={40}
                    text={`${culturalPoints}/40`}
                    styles={buildStyles({
                      textSize: "14px",
                      pathColor: "#ff9800",
                      textColor: "#000",
                      trailColor: "#e0e0e0",
                    })}
                  />
                </div>
                <p>Cultural Points</p>
              </div>

              {/* Pending Requests */}
              <div className="dashboard-point-item pending-requests">
                <h1>{pendingRequests}</h1>
                <p>Pending Requests</p>
              </div>
            </div>

            <button className="dashboard-submit-btn" onClick={() => navigate("/RequestForm")}>
              Submit New Request
            </button>
          </div>

          {/* Upcoming Events Section */}
          <div className="dashboard-upcoming-events">
            <h3>Upcoming Events</h3>
            <ul>
              {events.map((event, index) => (
                <li key={index} className="event-item">
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
