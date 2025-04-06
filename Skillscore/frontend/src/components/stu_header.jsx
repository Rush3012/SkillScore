
// import React, { useState } from "react";
// import { FaArrowLeft } from "react-icons/fa6"; // Import FaArrowLeft
// import userImg from "../assets/profile.avif"; // Ensure the correct path
// import "./stu_header.css"; // Import the CSS file
// import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

// const StudentHeader = ({ title }) => {
//   const navigate = useNavigate(); // Initialize navigate function   
//   const [stuName, setStuName] = useState(null); 

  

//   return (
//     <header className="student-header">
//       <FaArrowLeft className="back-icon" onClick={() => navigate(-1)} /> {/* Back button */}
//       <div className="student-profile">
//         <span>Rushda P P</span>
//         <img src={userImg} alt="User" className="student-profile-pic" />
//       </div>
//     </header>
//   );
// };

// export default StudentHeader;

import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import userImg from "../assets/profile.avif";
import "./stu_header.css";
import { useNavigate } from "react-router-dom";

const StudentHeader = ({ title }) => {
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState("Loading..."); // Default state

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const userResponse = await fetch("http://localhost:8080/api/auth/profile", {
          credentials: "include", // Ensure cookies/session are sent
        });

        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await userResponse.json();
        const userId = userData.userId;

        const studentResponse = await fetch(`http://localhost:8080/api/students/by-user/${userId}`, {
          credentials: "include",
        });

        if (!studentResponse.ok) {
          throw new Error("Failed to fetch student data");
        }

        const studentData = await studentResponse.json();
        setStudentName(studentData.name || "Student");

      } catch (error) {
        console.error("Error fetching student details:", error);
        setStudentName("Unknown"); 
      }
    };

    fetchStudentData();
  }, []);

  return (
    <header className="student-header">
      <FaArrowLeft className="back-icon" onClick={() => navigate(-1)} />
      <div className="student-profile">
        <span>{studentName}</span>
        <img src={userImg} alt="User" className="student-profile-pic" />
      </div>
    </header>
  );
};

export default StudentHeader;

