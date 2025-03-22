
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
  const [events, setEvents] = useState([]);
  const [count, setCount] = useState();
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
          console.log("studentdata from useffect",studentData);
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

  useEffect(() => {
    const fetchRequests = async () => {
      console.log("stduent in fetchreq",student);
      if(student){
      try{
        console.log("inside fetchreq try: ", student.rollNumber);
        const requestsResponse = await fetch(`http://localhost:8080/api/requests/pending/${student.rollNumber}`, {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!requestsResponse.ok) {
          throw new Error(`Failed to fetch pending requests: ${requestsResponse.status} ${requestsResponse.statusText}`);
        }

        const pendingRequests = await requestsResponse.json();
        setCount(pendingRequests.length);
        console.log("grdsfd: ", count);
      }
      catch (err){
        setError(err.message);
        console.log(err.message);   
      }}
    };
    fetchRequests();
  },[student])

  useEffect(() => {
  
      const fetchEvents = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/events`, {
            credentials: "include",
          });
  
          if (!response.ok) throw new Error("Failed to fetch events");
  
          const data = await response.json();
          console.log("Fetched events:", data);
          
          const today = new Date();
  
          const sortedEvents = data.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  
          const latestThreeEvents = sortedEvents.filter(event => new Date(event.startDate) >= today).slice(0, 3);
  
          setEvents(latestThreeEvents);
        } catch (err) {
          console.error("Error fetching events:", err);
          setError(err.message);
        }
      };
  
      fetchEvents();
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
                <p>{student.institutePoints}/40</p>
                <span>Institute Points</span>
              </div>
              <div className="dashboard-point-item dashboard-cultural-points">
                <p>{student.departmentPoints}/40</p>
                <span>Department Points</span>
              </div>
              <div className="dashboard-point-item dashboard-pending-requests">
                <p>{count}</p>
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
              {events.length > 0 ? (
                events.map((event) => (
                  <li 
                    key={event.id} 
                    onClick={() => window.location.href = `/event/${event.id}`}
                  >
                    <FaCalendarAlt className="dashboard-event-icon" />
                    <div>
                    <p className="dashboard-event-title">{event.name}</p>
                    <p className="dashboard-event-date">{event.startDate}</p>
                    </div>
                  </li>
                ))
              ) : (
                <li>No upcoming events</li>
              )}
            </ul>
          </div>

        </div>
      </main>
    </div>
  );
}


