import React from "react";
import Sidebar from "../components/stu_sidebar";
import Header from "../components/stu_header";
import "./StudentProfile.css"; // Ensure you have the CSS file for styling
import pic from "../assets/Student_image.jpeg";
const StudentProfile = () => {
  // Sample student data (replace this with API data)
  const student = {
    name: "Rushda P P",
    role: "Student",
    activityPoints: 52,
    rollNumber: "B220503CS",
    program: "B.Tech in Computer Science and Engineering",
    semester: 6,
    Batch: "CS02",
    gender: "Female",
    mentor: "Hiran V Nath",
    email: "rushda_b220503cs@nitc.ac.in",
    profileImage: pic, // Replace with actual profile URL
    coverImage: "https://static.vecteezy.com/system/resources/thumbnails/052/188/685/small_2x/elegant-green-emerald-luxury-background-with-gold-lines-abstract-wave-wallpaper-creative-design-vector.jpg", // Replace with actual cover image URL
  };

  return (
    <div className="profile-container">
      {/* Sidebar */}
      <Sidebar role="STUDENT" />

      {/* Main Content */}
      <div className="profile-content">
        <Header />
        <h2 className="profile-title">Profile</h2>

        <div className="profile-card">
          {/* Cover Image */}
          <div className="cover-image">
            <img src={student.coverImage} alt="Cover" />
          </div>

          {/* Profile Info */}
          <div className="profile-header">
            <img src={student.profileImage} alt="Profile" className="profile-pic" />
            <h3>{student.name}</h3>
            <p>{student.role}</p>
          </div>

          {/* Activity Points & Roll Number */}
          <div className="profile-stats">
            <div>
              <h4>{student.activityPoints}</h4>
              <p>Activity Points</p>
            </div>
            <div>
              <h4>{student.rollNumber}</h4>
              <p>Roll Number</p>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="profile-info">
            <h3>Personal</h3>
            <div className="profile-details">
              <div>
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Semester:</strong> {student.semester}</p>
                <p><strong>Email:</strong> {student.mentor}</p>
              </div>
              <div>
                <p><strong>Program:</strong> {student.program}</p>
                <p><strong>Batch:</strong> {student.Batch}</p>
                <p><strong>Gender:</strong> {student.gender}</p>
                <p><strong>Email:</strong> {student.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
