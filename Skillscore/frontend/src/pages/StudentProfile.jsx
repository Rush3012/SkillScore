import React, { useEffect, useState } from "react";
import Sidebar from "../components/stu_sidebar";
import Header from "../components/stu_header";
import "./StudentProfile.css"; // Ensure you have the CSS file for styling
import pic from "../assets/profile.avif"; // Ensure the correct path

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const userResponse = await fetch("/api/auth/profile", {
            credentials: "include"
        }); 
        if (!userResponse.ok) {
          throw new Error("Failed to fetch student data");
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
          setStudent(studentData || "Student");
  
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
            <img src={student.coverImage || "https://static.vecteezy.com/system/resources/thumbnails/052/188/685/small_2x/elegant-green-emerald-luxury-background-with-gold-lines-abstract-wave-wallpaper-creative-design-vector.jpg"} alt="Cover" />
          </div>

          {/* Profile Info */}
          <div className="profile-header">
            <img src={student.profileImage || pic} alt="Profile" className="profile-pic" />
            <h3>{student.name}</h3>
            <p>{student.role}</p>
          </div>

          {/* Activity Points & Roll Number */}
          <div className="profile-stats">
            <div>
              <h4>{student.totalPoints}</h4>
              <p>Activity Points</p>
            </div>
            <div>
              <h4>{student.rollNumber}</h4>
              <p>Roll Number</p>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="profile-info">
            <div className="profile-details">
              <div>
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Semester:</strong> {student.semester}</p>
                <p><strong>Faculty Advisor:</strong> {student.facultyName}</p>
              </div>
              <div>
                <p><strong>Program:</strong> {"Bachelor of Technology"}</p>
                <p><strong>Department:</strong> {student.department}</p>
                <p><strong>Batch:</strong> {student.batch}</p>
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
