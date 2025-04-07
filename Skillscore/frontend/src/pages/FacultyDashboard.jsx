
import React, { useEffect, useState } from "react";
import FacultySidebar from "../components/fac_sidebar";
import FacultyHeader from "../components/fac_header";
import "./FacultyDashboard.css";

const FacultyDashboard = () => {
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]); 
  const [requests, setRequests] = useState([]);
  const [count, setCount] = useState(null);

  useEffect(() => {
    const fetchFacultyData = async () => {
      try {
        const userResponse = await fetch("http://localhost:8080/api/auth/user", { credentials: "include" });
        if (!userResponse.ok) throw new Error("Failed to fetch user profile");

        const userData = await userResponse.json();
        const userId = userData.userId;

        const facultyResponse = await fetch(`http://localhost:8080/api/faculty/by-user/${userId}`, {
          credentials: "include",
        });

        if (!facultyResponse.ok) throw new Error("Failed to fetch faculty data");

        const facultyData = await facultyResponse.json();
        setFaculty(facultyData || { name: "Faculty" });

      } catch (error) {
        console.error("Error fetching faculty data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFacultyData();
  }, []);

  useEffect(() => {
    if (!faculty || !faculty.facultyId) return; 

    const fetchEvents = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/events/faculty/${faculty.facultyId}`, {
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
  }, [faculty]); 

  useEffect(() => {
    if (!faculty || !faculty.facultyId) return; 
    const fetchRequest = async () => {
      try {
        const requestResponse = await fetch(`http://localhost:8080/api/requests/faculty/${faculty.facultyId}`, {
          credentials: "include",
        });
  
        if (!requestResponse.ok) throw new Error("Failed to fetch requests");
  
        const requestList = await requestResponse.json();
  
        const tasks = requestList.slice(0, 3);
        setCount(requestList.length);
        setRequests(tasks);
      } catch (err) {
        console.error("Error fetching requests:", err);
        setError(err.message);
      }
    };
  
    fetchRequest();
  }, [faculty]); // Run only when `faculty` changes
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="dashboard-container">
      {/* Faculty Sidebar */}
      <FacultySidebar />
      
      {/* Main Content */}
      <div className="main-content">
        {/* Faculty Header */}
        <FacultyHeader />

        {/* Top Section (Split into Two Columns) */}
        <div className="top-section">
          {/* Left Side: Faculty Details */}
          <div className="left-section">
            <h2>Faculty Information</h2>
            <div className="faculty-card">
              <p><strong>Name:</strong> {faculty.name}</p>
              <p><strong>Department:</strong> {faculty.department}</p>
              <p><strong>Designation:</strong> {faculty.designation || "N/A"}</p>
              <p><strong>Advisor:</strong> {faculty.isAdvisor ? "Yes" : "No"}</p>
            </div>
          </div>

          {/* Right Side: Two Stacked Cards */}
          <div className="right-section">
            <div className="card">
              <h3>Total Students</h3>
              <p className="count">{faculty.studentCount}</p>
            </div>
            <div className="card">
              <h3>Requests</h3>
              <p className="count">{count}</p>
              <span>to be approved</span>
            </div>
          </div>
        </div>

        {/* Bottom Section: Events */}
        <div className="bottom-section">
          <h2>My Events</h2>
          <div className="events">
            {events.length > 0 ? (
              events.map((event) => (
                <div 
                  key={event.id} 
                  className="event" 
                  onClick={() => window.location.href = `/faculty/event/${event.id}`} 
                >
                  <p className="event-title">{event.name}</p>
                  <span>{event.startDate} - {event.endDate}</span>
                </div>
              ))
            ) : (
              <p>No events available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;