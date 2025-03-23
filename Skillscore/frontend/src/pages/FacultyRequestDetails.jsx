import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StuSidebar from "../components/fac_sidebar";
import StuHeader from "../components/fac_header";
import "./FacultyRequestDetails.css";

const FacultyRequestDetails = () => {
  const navigate = useNavigate();
  const [rejectReason, setRejectReason] = useState("");

  // Sample request details (Replace with API if needed)
  const request = {
    eventName: "NSS Camp",
    student: "SreeDevi",
    coordinator: "Vinod P",
    points: 8,
    date: "19-05-2024",
    description: "No description given",
    documentUrl: "/path-to-docs/nss.jpg", // Replace with actual file URL
  };

  // Handle Accept
  const handleAccept = () => {
    alert("Request Accepted!");
    navigate("/faculty/requests");
  };

  // Handle Reject
  const handleReject = () => {
    if (!rejectReason.trim()) {
      alert("Please enter a reason for rejection.");
      return;
    }
    alert(`Request Rejected! Reason: ${rejectReason}`);
    navigate("/faculty/requests");
  };

  return (
    <div className="faculty-page">
      <StuSidebar />
      <div className="content">
        <StuHeader title="Requests" />

        <div className="request-container">
          <h2 className="page-title">Requests</h2>

          <div className="request-card">
            <div className="request-info">
              <div className="left">
                <p><strong>Event Name</strong> <br /> {request.eventName}</p>
                <p><strong>Student</strong> <br /> {request.student}</p>
                <p><strong>Activity Coordinator</strong> <br /> {request.coordinator}</p>

                {/* Document Section */}
                <p><strong>View Document</strong></p>
                <div className="document-actions">
                  <a href={request.documentUrl} target="_blank" rel="noopener noreferrer">
                    <button className="view-btn">🔍 View</button>
                  </a>
                  <a href={request.documentUrl} download>
                    <button className="download-btn">⬇ Download</button>
                  </a>
                </div>
              </div>

              <div className="right">
                <p><strong>Activity Points</strong> <br /> {request.points}</p>
                <p><strong>Date of Event</strong> <br /> {request.date}</p>
                <p><strong>Description</strong> <br /> {request.description}</p>
              </div>
            </div>

            {/* Reason Section */}
            <div className="reason-section">
              <label><strong>* Reason</strong></label>
              <textarea
                placeholder="Reason for rejection..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="accept-btn" onClick={handleAccept}>✔ ACCEPT</button>
              <button className="reject-btn" onClick={handleReject}>❌ REJECT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyRequestDetails;
