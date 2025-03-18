
// import React, { useEffect, useState } from "react";
// import { FaUser, FaCalendarAlt, FaClipboardList, FaSignOutAlt } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import "./FacultyDashboard.css";
// import logo from "../assets/skillscore_logo.png";

// const FacultyDashboard = () => {
//   const [faculty, setFaculty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchFcultyData = async () => {
//       try {
//         const userResponse = await fetch("/api/auth/profile", {
//             credentials: "include"
//         }); 
//         if (!userResponse.ok) {
//           throw new Error("Failed to fetch student data");
//         }
//         const userData = await userResponse.json();
//         const userId = userData.userId;
//         const facultyResponse = await fetch(`http://localhost:8080/api/faculty/by-user/${userId}`, {
//           credentials: "include",
//         });
      
//         if (!facultyResponse.ok) {
//           throw new Error("Failed to fetch student data");
//         }

//         const facultyData = await facultyResponse.json();
//         setFaculty(facultyData || "Faculty");

    
//       }catch(error)  {
//         console.error("Error fetching faculty data:", error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFcultyData();

//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   const handleLogout = () => {
//     // Remove authentication token (if stored in localStorage/sessionStorage)
//     localStorage.removeItem("authToken"); // Adjust based on your auth mechanism
//     sessionStorage.removeItem("authToken");
  
//     // Optionally, clear other user-related data
//     localStorage.removeItem("userId"); // If you store userId
//     sessionStorage.removeItem("userRole");
  
//     // Redirect to login page
//     window.location.href = "/"; // Redirects user to login
//   };
  

//   return (
//     <div className="dashboard-container">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <div className="logo">
//           <img src={logo} alt="SkillScore" />
//           <h4>SkillScore</h4>
//         </div>
//         <ul>
//           <li className="active">
//             <FaClipboardList /> <Link to="/faculty-dashboard">Dashboard</Link>
//           </li>
//           <li>
//             <FaUser /> <Link to="/students">Students</Link>
//           </li>
//           <li>
//             <FaCalendarAlt /> <Link to="/eventss">Events</Link>
//           </li>
//           <li>
//             <FaClipboardList /> <Link to="/requests">Requests</Link>
//           </li>
//         </ul>
//         <button className="logout" onClick={handleLogout}>
//           <FaSignOutAlt /> Logout
//         </button>
//       </div>

//       {/* Main Content */}
//       <div className="main-content">
//         {/* Header */}
//         <div className="faculty-header">
//           <div className="header-content">
//             <h1>Welcome {faculty?.name}!</h1>
//           </div>
//           <div className="profile">
//             <span>Thursday, May 16, 2024</span>
//             <div className="profile-info">
//               <img src="/faculty-profile.jpg" alt="Faculty" />
//               <div className="faculty-details">
//                 <h4>{faculty?.name}</h4>
//                 <p>Faculty</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Dashboard Cards (Hardcoded) */}
//         <div className="dashboard-cards">
//           <div className="card">
//             <h3>Total Students</h3>
//             <p className="count">120</p>
//           </div>
//           <div className="card highlight">
//             <h3>Students Below Credit</h3>
//             <p className="count red">15%</p>
//             <span>18 Students</span>
//           </div>
//           <div className="card">
//             <h3>Requests</h3>
//             <p className="count">8</p>
//             <span>3 to be approved</span>
//           </div>
//         </div>

//         {/* Tasks Section (Hardcoded) */}
//         <div className="dashboard-section">
//           <h2>Tasks</h2>
//           <div className="task-list">
//             <div className="task-item">
//               <span className="task-icon">✔️</span>
//               <div className="task-content">
//                 <p>Approval for NSS Camp Activity Points</p>
//                 <span>May 13, 2024</span>
//               </div>
//             </div>
//             <div className="task-item warning">
//               <span className="task-icon">⚠️</span>
//               <div className="task-content">
//                 <p>Biometric Registration Pending</p>
//                 <span>May 13, 2024</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Upcoming Events (Hardcoded) */}
//         <div className="dashboard-section">
//           <h2>Upcoming Events</h2>
//           <div className="events">
//             <div className="event">
//               <p className="event-title">Level-Up Seminar</p>
//               <span>May 31, 2024</span>
//             </div>
//             <div className="event">
//               <p className="event-title">Innovation Fair</p>
//               <span>June 13, 2024</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FacultyDashboard;


import React, { useEffect, useState } from "react";
import FacultySidebar from "../components/fac_sidebar";
import FacultyHeader from "../components/fac_header";
import "./FacultyDashboard.css";

const FacultyDashboard = () => {
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFacultyData = async () => {
      try {
        const userResponse = await fetch("/api/auth/profile", { credentials: "include" });
        if (!userResponse.ok) throw new Error("Failed to fetch user profile");

        const userData = await userResponse.json();
        const userId = userData.userId;

        const facultyResponse = await fetch(`http://localhost:8080/api/faculty/by-user/${userId}`, {
          credentials: "include",
        });

        if (!facultyResponse.ok) throw new Error("Failed to fetch faculty data");

        const facultyData = await facultyResponse.json();
        setFaculty(facultyData || { name: "Faculty" });

      } catch (error) {
        console.error("Error fetching faculty data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFacultyData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="dashboard-container">
      {/* Faculty Sidebar */}
      <FacultySidebar />

      {/* Main Content */}
      <div className="main-content">
        {/* Faculty Header */}
        <FacultyHeader/>

        {/* Dashboard Cards */}
        <div className="dashboard-cards">
          <div className="card">
            <h3>Total Students</h3>
            <p className="count">40</p>
          </div>
          <div className="card highlight">
            <h3>Students Below Credit</h3>
            <p className="count red">60%</p>
            <span>24 Students</span>
          </div>
          <div className="card">
            <h3>Requests</h3>
            <p className="count">17</p>
            <span>11 to be approved</span>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="dashboard-section">
          <h2>Tasks</h2>
          <div className="task-list">
            <div className="task-item">
              <span className="task-icon">✔️</span>
              <div className="task-content">
                <p>Approval for NSS Camp Activity Points</p>
                <span>May 13, 2024</span>
              </div>
            </div>
            <div className="task-item warning">
              <span className="task-icon">⚠️</span>
              <div className="task-content">
                <p>Biometric Registration Pending</p>
                <span>May 13, 2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="dashboard-section">
          <h2>Upcoming Events</h2>
          <div className="events">
            <div className="event">
              <p className="event-title">Level-Up Seminar</p>
              <span>May 31, 2024</span>
            </div>
            <div className="event">
              <p className="event-title">Innovation Fair</p>
              <span>June 13, 2024</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
