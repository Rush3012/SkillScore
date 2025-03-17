import React from "react";
import { FaArrowLeft } from "react-icons/fa6"; // Import FaArrowLeft
import userImg from "../assets/Student_image.jpeg"; // Ensure the correct path
import "./stu_header.css"; // Import the CSS file
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const StudentHeader = ({ title }) => {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <header className="student-header">
      <FaArrowLeft className="back-icon" onClick={() => navigate(-1)} /> {/* Back button */}
      <div className="student-profile">
        <span>Rushda P P</span>
        <img src={userImg} alt="User" className="student-profile-pic" />
      </div>
    </header>
  );
};

export default StudentHeader;
