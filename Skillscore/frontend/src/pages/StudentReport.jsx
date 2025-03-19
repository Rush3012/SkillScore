import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import FacultySidebar from "../components/fac_sidebar";
import FacultyHeader from "../components/fac_header";
import "./StudentReport.css"; // Ensure styles are included

const StudentReport = () => {
  const navigate = useNavigate();

  // Mock student data (Replace with actual API response)
  const student = {
    name: "Sreedevi K",
    rollNumber: "B220678CS",
    semester: "VI",
    cgpa: 8.57,
    points: {
      total: { achieved: 54, max: 80 },
      cultural: { achieved: 31, max: 40 },
      institute: { achieved: 23, max: 40 },
    },
    requests: [],
  };

  return (
    <div className="student-report-container">
      {/* Sidebar */}
      <FacultySidebar />

      {/* Main Content */}
      <div className="student-report-content">
        {/* Header */}
        <FacultyHeader />

        {/* Back Button */}
        <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

        <h2 className="student-title">Student Report</h2>

        {/* Student Info Section */}
        <div className="student-info">
          <h2 className="student-name">{student.name}</h2>

          {/* Points Section */}
          <div className="points-section">
            {Object.keys(student.points).map((category) => (
              <div key={category} className="progress-item">
                <CircularProgressbar
                  value={student.points[category].achieved}
                  maxValue={student.points[category].max}
                  text={`${student.points[category].achieved}/${student.points[category].max}`}
                  styles={buildStyles({
                    textColor: "#333",
                    pathColor:
                      category === "total"
                        ? "#4CAF50"
                        : category === "cultural"
                        ? "#FFC107"
                        : "#D32F2F",
                  })}
                />
                <p>{category.charAt(0).toUpperCase() + category.slice(1)} Points</p>
              </div>
            ))}
          </div>

          {/* Student Details */}
          <div className="student-details">
            <p><strong>Roll No:</strong> {student.rollNumber}</p>
            <p><strong>Semester:</strong> {student.semester}</p>
            <p><strong>CGPA:</strong> {student.cgpa}</p>
          </div>
        </div>

        {/* Requests Section */}
        <div className="requests-section">
          <h3>Requests</h3>
          {student.requests.length > 0 ? (
            student.requests.map((req, index) => <p key={index}>{req}</p>)
          ) : (
            <p className="no-requests">No new requests</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentReport;
