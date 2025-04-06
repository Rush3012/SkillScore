

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import FacultySidebar from "../components/fac_sidebar";
import FacultyHeader from "../components/fac_header";
import "./StudentReport.css"; // Ensure styles are included

const StudentReport = () => {
  const { rollNumber } = useParams(); // Get student ID from URL
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removing, setRemoving] = useState(false);


  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        // Fetch student details
        const studentResponse = await fetch(`http://localhost:8080/api/students/${rollNumber}`, {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!studentResponse.ok) {
          throw new Error(`Failed to fetch student data: ${studentResponse.status} ${studentResponse.statusText}`);
        }

        const studentData = await studentResponse.json();

        // Fetch pending requests for this student from request_approval by that faculty
        const requestsResponse = await fetch(`http://localhost:8080/api/requests/pending/${rollNumber}`, {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!requestsResponse.ok) {
          throw new Error(`Failed to fetch pending requests: ${requestsResponse.status} ${requestsResponse.statusText}`);
        }

        const pendingRequests = await requestsResponse.json();

        // Merge student data with sorted pending requests (latest first)
        setStudent({ ...studentData, pendingRequests: pendingRequests.sort((a, b) => b.id - a.id) });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [rollNumber]);

  const handleRemoveStudent = async () => {
    if (!window.confirm(`Are you sure you want to remove ${student.name}? This action cannot be undone.`)) return;

    setRemoving(true);
    try {
      const response = await fetch(`http://localhost:8080/api/students/${rollNumber}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to remove student. Please try again.");
      }

      alert("Student removed successfully!");
      navigate("/faculty/students"); // Redirect to the faculty's student list
    } catch (error) {
      alert(error.message);
    } finally {
      setRemoving(false);
    }
  };


  if (loading) return <p>Loading student data...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!student || Object.keys(student).length === 0) return <p>No student data found.</p>;

  return (
    <div className="student-report-container">
      <FacultySidebar />

      <div className="student-report-content">
        <FacultyHeader />

        <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

        <h2 className="student-title">Student Report</h2>

        <div className="student-info">
          <h2 className="student-name">{student.name}</h2>

          
          <div className="points-section">
          {/* Total Points */}
          <div className="progress-item">
            <CircularProgressbar
              value={student.totalPoints}
              maxValue={80}
              text={`${student.totalPoints}/80`}
              styles={buildStyles({
                textColor: "#333",
                pathColor: "#4CAF50", // Green
              })}
            />
            <p>Total Points</p>
          </div>

          {/* Institute Points */}
          <div className="progress-item">
            <CircularProgressbar
              value={student.institutePoints}
              maxValue={40}
              text={`${student.institutePoints}/40`}
              styles={buildStyles({
                textColor: "#333",
                pathColor: "#FFC107", // Yellow
              })}
            />
            <p>Institute Points</p>
          </div>

          {/* Department Points */}
          <div className="progress-item">
            <CircularProgressbar
              value={student.departmentPoints}
              maxValue={40}
              text={`${student.departmentPoints}/40`}
              styles={buildStyles({
                textColor: "#333",
                pathColor: "#D32F2F", // Red
              })}
            />
            <p>Department Points</p>
          </div>
        </div>

          <div className="student-details">
            <p><strong>Roll No:</strong> {student.rollNumber}</p>
            <p><strong>Semester:</strong> {student.semester}</p>
          </div>
        </div>

        <div className="requests-section">
          <h3>Pending Requests</h3>
          {student.pendingRequests && student.pendingRequests.length > 0 ? (
            <div className="pending-requests-container">
              {student.pendingRequests.map((req) => (
                <div key={req.id} className="request-card" onClick={() => navigate(`/faculty/request/${req.id}`)}>
                  <h4>{req.activityName}</h4>
                  <p><strong>Points:</strong> {req.points}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-requests">No pending requests</p>
          )}
        </div>
        {/* Remove Student Button */}
        <div className="remove-student-section">
          <button 
            className="remove-student-button"
            onClick={handleRemoveStudent}
            disabled={removing}
          >
            {removing ? "Removing..." : "Remove Student"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentReport;
 
