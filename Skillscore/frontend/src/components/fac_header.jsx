import React from "react";
import "./fac_header.css"; // Ensure this file exists
import profilePic from "../assets/fa.png"; // Import the profile picture

const FacultyHeader = ({ name, role }) => {
  const currentDate = new Date().toLocaleDateString("en-US", { 
    weekday: "long", year: "numeric", month: "long", day: "numeric" 
  });

  return (
    <div className="faculty-header">
      <span className="date">{currentDate}</span>
      <div className="faculty-info">
        <img src={profilePic} alt="Profile" className="faculty-profile-pic" /> {/* Profile Picture */}
        <div className="faculty-details">
          <span className="faculty-name"><strong>{name}</strong></span>
          <span className="faculty-role">{role}</span>
        </div>
      </div>
    </div>
  );
};

export default FacultyHeader;

