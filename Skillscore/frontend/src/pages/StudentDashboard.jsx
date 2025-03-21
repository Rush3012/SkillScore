
import React, { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css";
import Header from "../components/stu_header";
import Sidebar from "../components/stu_sidebar";

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const userResponse = await fetch("/api/auth/profile", {
            credentials: "include"
        }); 
        if (!userResponse.ok) {
          throw new Error("Failed to fetch student data");
        }
        const userData = await userResponse.json();
        const userId = userData.userId;

        const studentResponse = await fetch(`http://localhost:8080/api/students/by-user/${userId}`, {
            credentials: "include",
          });
        
          if (!studentResponse.ok) {
            throw new Error("Failed to fetch student data");
          }
  
          const studentData = await studentResponse.json();
          setStudent(studentData || "Student");
  
      
        } catch(err) {
        console.error("Error fetching student data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar role="STUDENT" />

      {/* Main Content */}
      <main className="dashboard-main-content">
        {/* Header */}
        <Header />

        {/* Points Summary & Events */}
        <div className="dashboard-content-wrapper">
          {/* Points Section */}
          <div className="dashboard-points-summary">
            <h2>Total Points</h2>
            <h1>{student.totalPoints}/80</h1>
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
            <button className="dashboard-submit-btn" onClick={() => navigate("/student/request/add")}>
              Submit New Request
            </button>
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
                  <p className="dashboard-event-date">March 19 from 8:00 AM to 5:00 PM</p>
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


