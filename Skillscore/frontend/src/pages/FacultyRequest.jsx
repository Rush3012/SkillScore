
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StuSidebar from "../components/fac_sidebar";
import StuHeader from "../components/fac_header";
import "./FacultyRequest.css"; 

const FacultyRequestPage = () => {
  const navigate = useNavigate();
  
  // Sample request data
  const [requests, setRequests] = useState([
    { id: 1, eventName: "NSS Camp", studentName: "Sreedevi", date: "2024-05-19", status: "Pending" },
    { id: 2, eventName: "TechFest Volunteering", studentName: "Arjun", date: "2024-06-10", status: "Pending" },
    { id: 3, eventName: "Cultural Fest Organizing", studentName: "Meera", date: "2024-07-15", status: "Pending" }
  ]);

  // Navigate to detailed request page
  const handleRequestClick = (request) => {
    navigate(`/FacultyRequest/${request.id}`, { state: request });
  };

  return (
    <div className="faculty-page">
      <StuSidebar />
      <div className="content">
        <StuHeader title="Requests" />
        <div className="request-list">
          {requests.length === 0 ? (
            <p>No pending requests.</p>
          ) : (
            requests.map((req) => (
              <div key={req.id} className="request-item" onClick={() => handleRequestClick(req)}>
                <h3>📌 {req.eventName}</h3>
                <p><strong>Student:</strong> {req.studentName}</p>
                <p><strong>Date:</strong> {req.date}</p>
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
