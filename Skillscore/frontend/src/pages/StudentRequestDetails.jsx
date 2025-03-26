
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/stu_sidebar";
import Header from "../components/stu_header";
import "./StudentRequestDetails.css";

const StudentRequestDetails = () => {
  const { id } = useParams(); // Get request ID from URL
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [document, setDocument] = useState([]);
  const [approvals, setApprovals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/requests/${id}`, {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch request details");
        const data = await response.json();
        setRequest(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRequestDetails();
  }, [id]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/documents/files/${id}`);
        if (!response.ok) throw new Error("Failed to fetch documents");
        const data = await response.json();
        setDocument(data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
    fetchDocuments();
  }, [id]);

  useEffect(() => {
    const fetchApprovals = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/requests/all/${id}`);
        if (!response.ok) throw new Error("Failed to fetch approvals");
        const data = await response.json();
        setApprovals(data);
      } catch (error) {
        console.error("Error fetching approvals:", error);
      }
    };
    fetchApprovals();
  }, [id]);

    const handleEditAndResend = () => {
        navigate(`/student/request/edit/${id}`);
    };
    const isRejected = approvals.some((approval) => approval.status === "REJECTED");


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!request) return <p>No request found.</p>;

  return (
    <div className="student-page">
      <Sidebar />
      <div className="content">
        <Header/>

        <div className="request-container">
          <h2 className="page-title">Request Details</h2>
          <div className="request-card">
            <div className="request-info">
              <div className="left">
                <p><strong>Event Name</strong> <br /> {request.activityName}</p>
                <p><strong>Student</strong> <br /> {request.student.name}</p>
                <p><strong>Activity Coordinator</strong> <br /> {request.faculty.name}</p>
              </div>
              <div className="right">
                <p><strong>Activity Points</strong> <br /> {request.points}</p>
                <p><strong>Date of Event</strong> <br /> {request.eventDate}</p>
                <p><strong>Description</strong> <br /> {request.description}</p>
              </div>
            </div>
          </div>

          {/* Document View Section */}
          <div className="documents-section">
            <h3 className="section-title">Attached Documents</h3>
            {document.length > 0 ? (
              <ul className="document-list">
                {document.map((doc) => (
                  <li key={doc.id} className="document-item">
                    <a
                      href={`http://localhost:8080/api/documents/files/preview?filePath=${encodeURIComponent(doc.filePath.replace("uploads/", ""))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="document-link"
                    >
                      {doc.name} ({doc.type})
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No documents available for this request.</p>
            )}
          </div>

          {/* Approval Status Section */}
          <div className="approvals-section">
            <h3 className="section-title">Approval Status</h3>
            {approvals.length > 0 ? (
              <ul className="approval-list">
                {approvals.map((approval) => (
                  <li key={approval.id} className="approval-item">
                    <p><strong>Faculty:</strong> {approval.faculty.name}</p>
                    <p><strong>Status:</strong> {approval.status}</p>
                    {approval.status === "REJECTED" && (
                      <p><strong>Reason:</strong> {approval.comments}</p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No approvals found for this request.</p>
            )}
          </div>
          {isRejected && (
            <div className="resend-section">
              <button className="resend-button" onClick={handleEditAndResend}>
                Edit & Resend
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentRequestDetails;

