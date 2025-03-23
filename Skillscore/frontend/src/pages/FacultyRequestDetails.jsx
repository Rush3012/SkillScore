import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StuSidebar from "../components/fac_sidebar";
import StuHeader from "../components/fac_header";
import "./FacultyRequestDetails.css";

const FacultyRequestDetails = () => {
  const { id } = useParams(); // Get request ID from URL
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [faculty, setFaculty] = useState(null);
  const [showRejectPopup, setShowRejectPopup] = useState(false);
  const [isFA, setIsFA] = useState(false);
  const [isApproved, setIsApproved] = useState(false);


  // Fetch request details from API
  useEffect(() => {
    const fetchRequestDetails = async () => {
        
      try {
        const userResponse = await fetch("/api/auth/profile", { credentials: "include" });
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

        const response = await fetch(`http://localhost:8080/api/requests/faculty/${facultyData.facultyId}/${id}`, {
            credentials: "include",
        });
        if (!response.ok) {
            throw new Error("Failed to fetch requests");
        }
        const data = await response.json();
        setRequest(data);
        if (data.student.facultyId === facultyData.facultyId) {
            console.log("The logged-in faculty is the FA of the student.");
        
            try {
                const approvalReply = await fetch(`http://localhost:8080/api/requests/all/${id}`, {
                    credentials: "include",
                });
        
                if (!approvalReply.ok) throw new Error("Failed to fetch approvals");
        
                const replyData = await approvalReply.json();
                console.log(replyData);
        
                if (replyData.length === 1) {
                    setIsApproved(true);
                } else {
                    // 🔹 Find the Event Coordinator's approval (not FA's)
                    const eventCoordinatorApproval = replyData.find(
                        approval => approval.faculty.facultyId !== facultyData.facultyId
                    );
        
                    if (eventCoordinatorApproval && eventCoordinatorApproval.status === "APPROVED") {
                        setIsApproved(true);
                    } else {
                        setIsApproved(false);
                    }
                }
            } catch (error) {
                console.error("Error fetching approvals:", error);
            }
        
            setIsFA(true);
        } else {
            console.log("The logged-in faculty is NOT the FA of the student.");
        }
        } catch (err) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
  };
        

    fetchRequestDetails();
  }, [id]);

  // Handle Accept Request
  const handleAccept = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/requests/faculty/${faculty.facultyId}/${id}/update-status?status=APPROVED`, {
        method: "PUT",
      });
  
      if (!response.ok) throw new Error("Failed to accept request");
  
      alert("Request Accepted!");
      navigate("/faculty/requests");
    } catch (error) {
      alert(error.message);
    }
  };
  
  // Handle Reject Request
  const handleReject = async () => {
    if (!rejectReason.trim()) {
      alert("Please enter a reason for rejection.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8080/api/requests/faculty/${faculty.facultyId}/${id}/update-status?status=REJECTED`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: rejectReason }),
      });
  
      if (!response.ok) throw new Error("Failed to reject request");
  
      alert(`Request Rejected! Reason: ${rejectReason}`);
      setShowRejectPopup(false); // Close popup

      navigate("/faculty/requests");
    } catch (error) {
      alert(error.message);
    }
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!request) return <p>No request found.</p>;

  return (
    <div className="faculty-page">
      <StuSidebar />
      <div className="content">
        <StuHeader title="Requests" />

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
                <p>am i the fa? <br /> {isFA}</p>
              </div>
            </div>

            

            
            
            
            
          </div>
          <p><strong>View Document</strong></p>
            <div className="document-actions">
                <a href={request.documentUrl} target="_blank" rel="noopener noreferrer">
                <button className="view-btn">🔍 View</button>
                </a>
                <a href={request.documentUrl} download>
                <button className="download-btn">⬇ Download</button>
                </a>
                
            </div>
            {(isFA && isApproved) || (!isFA) ? (
                <div className="action-buttons">
                    <button className="accept-btn" onClick={handleAccept}>✔ ACCEPT</button>
                    <button className="reject-btn" onClick={() => setShowRejectPopup(true)}>❌ REJECT</button>
                </div>
            ) : (
                <p>The request is not approved by the respective Activity Coordinator. Kindly wait for it to happen.</p>
            )}
            {isApproved ? ( <p>the request is approved by activity coordinator</p>) : (<p> not APPROVED</p>)}

            {showRejectPopup && (
            <div className="popup-overlay">
                <div className="popup">
                    <h3>Reason for Rejection</h3>
                    <textarea
                        placeholder="Enter reason..."
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                    />
                    <div className="action-buttons">
                        <button className="confirm-btn" onClick={handleReject}>Confirm Reject</button>
                        <button className="cancel-btn" onClick={() => setShowRejectPopup(false)}>Cancel</button>
                    </div>
                </div>
             </div>
            )}

        </div>
      </div>
    </div>
  );
};

export default FacultyRequestDetails;
