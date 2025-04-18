import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StuSidebar from "../components/fac_sidebar";
import StuHeader from "../components/fac_header";
import "./FacultyRequest.css";

const FacultyRequestPage = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [faculty, setFaculty] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRequests, setFilteredRequests] = useState([]);



  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const userResponse = await fetch("http://localhost:8080/api/auth/user", { credentials: "include" });
        if (!userResponse.ok) throw new Error("Failed to fetch user profile");

        const userData = await userResponse.json();
        const userId = userData.userId;

        const facultyResponse = await fetch(`http://localhost:8080/api/faculty/by-user/${userId}`, {
          credentials: "include",
        });
        console.log("bla bla bla");
        if (!facultyResponse.ok) throw new Error("Failed to fetch faculty data");
        console.log("bla bla blaaaaaaaaaa1");

        const facultyData = await facultyResponse.json();
        setFaculty(facultyData || { name: "Faculty" });
        console.log("bla blaaaaaaaaaa2");

        console.log("faculty Id in requests:", facultyData.facultyId);
        console.log(" blaaaaaaaaaa3");

        const response = await fetch(`http://localhost:8080/api/requests/faculty/${facultyData.facultyId}`, {
            credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch requests");
        }
        const data = await response.json();
        setRequests(data);
        setFilteredRequests(data); // Initialize filtered list with all requests

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleRequestClick = (request) => {
    navigate(`/faculty/request/${request.id}`, { state: request });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
  
    const filtered = requests.filter((req) => {
      const studentName = req.student?.name ? req.student.name.toLowerCase() : "";
      const eventName = req.eventName ? req.eventName.toLowerCase() : "";
      const activityName = req.activityName ? req.activityName.toLowerCase() : "";
  
      return studentName.includes(value) || eventName.includes(value) || activityName.includes(value);
    });
  
    setFilteredRequests(filtered);
  };
  
  return (
    <div className="faculty-page">
      <StuSidebar />
      <div className="content">
        <StuHeader title="Requests" />

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search requests by student, event, or activity..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-bar"
        />
        <div className="request-list">
          {loading ? (
            <p>Loading requests...</p>
          ) : error ? (
            <p className="error">Error: {error}</p>
          ) : filteredRequests.length === 0 ? (
            <p>No pending requests.</p>
          ) : (
            filteredRequests.map((req) => (
              <div key={req.id} className="request-item" onClick={() => handleRequestClick(req)}>
                <h3>📌 {req.eventName}</h3>
                <p><strong>Student:</strong> {req.student.name}</p>
                <p><strong>Activity:</strong> {req.activityName}</p>
                <p className="status">Status: {req.status}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyRequestPage;
