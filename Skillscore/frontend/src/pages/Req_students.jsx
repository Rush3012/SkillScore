import React, { useState } from "react";
import "./Req_students.css";
import Header from "../components/stu_header";  // Student Header
import Sidebar from "../components/stu_sidebar"; // Student Sidebar

export default function Requests() {
  const [activeTab, setActiveTab] = useState("pending");

  const requests = {
    pending: [
      { id: 1, title: "NSS Camp" },
      { id: 2, title: "Ragam Workshop" },
    ],
    rejected: [
      { id: 3, title: "Lecture on AI in Upcoming World", description: "Upload a clear document" },
    ],
    approved: [
      { id: 4, title: "Tech Fest Volunteer", description: "Approved " },
    ],
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar role="STUDENT" />

      {/* Main Content */}
      <main className="dashboard-main-content">
        {/* Header */}
        <Header />

        <div className="requests-container">
          <h2>Requests</h2>

          {/* Tabs for Pending, Rejected, Approved */}
          <div className="tabs">
            <button className={activeTab === "pending" ? "active" : ""} onClick={() => setActiveTab("pending")}>
              Pending
            </button>
            <button className={activeTab === "rejected" ? "active" : ""} onClick={() => setActiveTab("rejected")}>
              Rejected
            </button>
            <button className={activeTab === "approved" ? "active" : ""} onClick={() => setActiveTab("approved")}>
              Approved
            </button>
          </div>

          {/* Request List */}
          <div className="request-list">
            {requests[activeTab].map((request) => (
              <div key={request.id} className="request-card">
                <h3>{request.title}</h3>
                {request.description && <p>{request.description}</p>}
                {activeTab === "pending" && (
                  <h10>Pending to be approved</h10>
                )}
                {/* "Edit" button only for Rejected Requests */}
                {activeTab === "rejected" && (
                  <button className="edit-button">EDIT</button>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
