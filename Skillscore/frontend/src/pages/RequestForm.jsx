// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { FaSignOutAlt, FaArrowLeft } from "react-icons/fa";
// import { FaRegUser, FaClipboardList, FaCalendarAlt } from "react-icons/fa";
// import logo from "../assets/skillscore_logo.png";
// import userImg from "../assets/Student_image.jpeg";
// import "./RequestForm.css";

// const RequestForm = () => {
//   const navigate = useNavigate(); // For navigation

//   return (
//     <div className="request-page-container">
//       {/* Sidebar */}
//       <aside className="sidebar">
//         <div className="sidebar-header">
//           <img src={logo} alt="SkillScore Logo" className="sidebar-logo" />
//           <span className="logo-text">SkillScore</span>
//         </div>
//         <nav className="sidebar-nav">
//           <ul>
//             <li onClick={() => navigate("/StudentDashboard")}>
//               <FaClipboardList /> Dashboard
//             </li>
//             <li onClick={() => navigate("/Profile")}>
//               <FaRegUser /> Profile
//             </li>
//             <li onClick={() => navigate("/Events")}>
//               <FaCalendarAlt /> Events
//             </li>
//             <li className="active" onClick={() => navigate("/Requests")}>
//               <FaClipboardList /> Requests
//             </li>
//           </ul>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <div className="request-form-content">
//         {/* Header */}
//         <header className="request-form-header">
//           <FaArrowLeft className="back-icon" onClick={() => navigate(-1)} />
//           <h1>Request Form</h1>
//           <div className="user-profile">
//             <span>Rushda P P</span>
//             <img src={userImg} alt="User" className="profile-pic" />
//           </div>
//         </header>

//         {/* Form */}
//         <div className="form-container">
//           <form>
//             <div className="form-grid">
//               <div className="form-group">
//                 <label>Activity Name:*</label>
//                 <input type="text" required />
//               </div>

//               <div className="form-group">
//                 <label>Activity Coordinator:</label>
//                 <select>
//                   <option>Select</option>
//                   <option>Faculty 1</option>
//                   <option>Faculty 2</option>
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label>Activity Category:*</label>
//                 <select required>
//                   <option value="">Select</option>
//                   <option value="Cultural">Cultural</option>
//                   <option value="Technical">Technical</option>
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label>Date of the Event:*</label>
//                 <input type="date" required />
//               </div>

//               <div className="form-group">
//                 <label>Faculty Advisor:*</label>
//                 <input type="text" required />
//               </div>

//               <div className="form-group">
//                 <label>Points Expected:</label>
//                 <input type="number" />
//               </div>

//               <div className="form-group full-width">
//                 <label>Description:</label>
//                 <textarea />
//               </div>

//               {/* File Upload Section */}
//               <div className="form-group full-width">
//                 <label>Upload Documents:*</label>
//                 <div className="file-upload-section">
//                   <input type="file" required />
//                   <button type="button" className="upload-btn">Upload</button>
//                   <button type="button" className="delete-btn">Delete</button>
//                   <button type="button" className="add-btn">+</button>
//                 </div>
//               </div>
//             </div>

//             {/* Declaration */}
//             <div className="form-checkbox">
//               <input type="checkbox" required />
//               <label>
//                 I hereby declare that all the details and documents submitted
//                 are true and correct to the best of my knowledge
//               </label>
//             </div>

//             {/* Submit Button */}
//             <button type="submit" className="submit-btn">SUBMIT</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RequestForm;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/stu_sidebar";
import Header from "../components/stu_header";
import "./RequestForm.css";

const RequestForm = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]); 
  const [selectedEvent, setSelectedEvent] = useState(""); 
  const [isOtherEvent, setIsOtherEvent] = useState(false); 
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [facultyList, setFacultyList] = useState([]); // ✅ Faculty list from backend


  const [formData, setFormData] = useState({
    studentId: "", 
    eventId: "",
    eventName: "",
    activityCoordinator: "",
    category: "",
    date: "",
    facultyAdvisor: "",
    points: "",
    description: "",
    file: null,
  });

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const userResponse = await fetch("/api/auth/profile", { credentials: "include" });
        if (!userResponse.ok) throw new Error("Failed to fetch student data");

        const userData = await userResponse.json();
        const userId = userData.userId;

        const studentResponse = await fetch(`http://localhost:8080/api/students/by-user/${userId}`, {
          credentials: "include",
        });

        if (!studentResponse.ok) throw new Error("Failed to fetch student data");

        const studentData = await studentResponse.json();
        setStudent(studentData);
        setFormData((prev) => ({ ...prev, studentId: studentData.rollNumber })); // ✅ Set studentId after fetching
      } catch (err) {
        console.error("Error fetching student data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentData();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/events");
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    const fetchFaculty = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/faculty");
        if (!response.ok) throw new Error("Failed to fetch faculty list");
        const data = await response.json();
        setFacultyList(data);
      } catch (error) {
        console.error("Error fetching faculty list:", error);
      }
    };
    fetchEvents();
    fetchFaculty();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEventChange = (e) => {
    const eventId = e.target.value;

    if (eventId === "other") {
      setIsOtherEvent(true);
      setFormData({ ...formData, eventId: "", eventName: "", category: "", date: "", facultyAdvisor: "", points: "", activityCoordinator: "" });
    } else {
      const selected = events.find((event) => event.id.toString() === eventId);
      if (selected) {
        setIsOtherEvent(false);
        setFormData({
          ...formData,
          eventId: selected.id,
          eventName: selected.name,
          category: selected.category,
          date: selected.startDate,
          facultyAdvisor: selected.faculty.id, 
          points: selected.points,
          activityCoordinator: selected.faculty.id, 
        });
      }
    }
    setSelectedEvent(eventId);
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleFacultyChange = (e) => {
    const selectedFacultyId = e.target.value;
    console.log("Selected Faculty ID:", selectedFacultyId);  
    setFormData({ ...formData, facultyAdvisor: selectedFacultyId });
    formData.facultyAdvisor = selectedFacultyId;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    let finalEventId = formData.eventId; 

    const requestData = new FormData();
    requestData.append("studentId", student?.rollNumber);
    requestData.append("description", formData.description);
    requestData.append("isOther", isOtherEvent.toString());

    if (isOtherEvent) {
      finalEventId = null;
      requestData.append("activityName", formData.eventName);
      requestData.append("activityType", formData.category);
      requestData.append("coordinatorId", formData.facultyAdvisor);
      requestData.append("points", formData.points.toString());
    }

    requestData.append("eventId", finalEventId);

    console.log("Sending FormData:", Object.fromEntries(requestData.entries())); // ✅ Debugging


    try {
      const response = await fetch("http://localhost:8080/requests/submit", {
        method: "POST",
        // headers: { 
        //   "Content-Type": "application/json",  // ✅ Ensure JSON content type
        //   "Accept": "application/json"
        // },

        body: requestData,
      });

      if (response.ok) {
        setMessage("Request submitted successfully!");
        navigate("/requests"); 
      } else {
        const errorText = await response.text();  // ✅ Capture error message
        console.error("Server Response:", errorText);
        setMessage("Failed to submit request.");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      setMessage("Error submitting request.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="request-page-container">
      <Sidebar/>
      <div className="request-form-content">
        <Header />
        <div className="form-container">
          {message && <p className="message">{message}</p>}

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              {/* Event Selection */}
              <div className="form-group">
                <label>Event Name:*</label>
                <select name="eventId" value={selectedEvent} onChange={handleEventChange} required>
                  <option value="">Select Event</option>
                  {events.map((event) => (
                    <option key={event.id} value={event.id}>{event.name}</option>
                  ))}
                  <option value="other">Other Event</option>
                </select>
              </div>

              {/* Manual Event Entry */}
              {isOtherEvent && (
                <>
                  <div className="form-group">
                    <label>Activity Name:</label>
                    <input type="text" name="eventName" value={formData.eventName} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Activity Category:</label>
                    <select name="category" value={formData.category} onChange={handleChange} required>
                      <option value="">Select</option>
                      <option value="Cultural">Cultural</option>
                      <option value="Technical">Technical</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Activity Coordinator:</label>
                    <select name="facultyAdvisor" value={formData.facultyAdvisor} onChange={handleFacultyChange} required>
                      <option value="">Select Faculty Advisor</option>
                      {facultyList.map((faculty) => (
                        <option key={faculty.facultyId} value={faculty.facultyId}>
                          {faculty.name}
                        </option>
                      ))}
                    </select>

                  </div>
                  <div className="form-group">
                    <label>Points Expected:</label>
                    <input type="number" name="points" value={formData.points} onChange={handleChange} />
                  </div>
                </>
              )}

              <div className="form-group">
                <label>Description:</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required />
              </div>

              {/* File Upload */}
              <div className="form-group full-width">
                <label>Upload Documents:*</label>
                <div className="file-upload-section">
                  <input type="file" onChange={handleFileChange} />
                </div>
              </div>
            </div>

            {/* Declaration */}
            <div className="form-checkbox">
              <input type="checkbox" required />
              <label>I declare that the details are correct to the best of my knowledge.</label>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-btn">SUBMIT</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;
