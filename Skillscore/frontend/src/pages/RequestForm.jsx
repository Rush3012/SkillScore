

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
  const [facultyList, setFacultyList] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);


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
    if (uploadedFiles.length < 3) {
      setUploadedFiles([...uploadedFiles, e.target.files[0]]);
    }
  };

  const handleFacultyChange = (e) => {
    const selectedFacultyId = e.target.value;
    console.log("Selected Faculty ID:", selectedFacultyId);  
    setFormData({ ...formData, facultyAdvisor: selectedFacultyId });
    formData.facultyAdvisor = selectedFacultyId;
  };

  const removeFile = (index) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
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

    console.log("Sending FormData:", Object.fromEntries(requestData.entries())); 


    try {
      const requestResponse = await fetch("http://localhost:8080/api/requests/submit", {
        method: "POST",
        body: requestData,
      });

      if (!requestResponse.ok) {
        const errorText = await requestResponse.text();
        console.error("Error submitting request:", errorText);
        setMessage("Failed to submit request.");
        return;
      }
  
      const request = await requestResponse.json(); 
      console.log("Request submitted successfully. ID:", request.requestId);
  
      for (const file of uploadedFiles) {
        const fileData = new FormData();
        fileData.append("file", file);
        fileData.append("requestId", request.requestId);
  
        await fetch("http://localhost:8080/api/documents/upload", {
          method: "POST",
          body: fileData,
        });
      }
  
      setMessage("Request submitted successfully!");
      navigate(`/student/request/PENDING/${student.rollNumber}`);
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
                      <option value="Cultural">Institute Level</option>
                      <option value="Technical">Department Level</option>
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
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="file-item">
                    <span>{file.name}</span>
                    <button type="button" onClick={() => removeFile(index)}></button>
                  </div>
                ))}
                {uploadedFiles.length < 3 && (
                  <>
                    <input type="file" onChange={handleFileChange} />
                    {/* <button type="button" onClick={() => document.querySelector("input[type=file]").click()}>➕</button> */}
                  </>
                )}
              </div>
            </div>

            {/* Declaration */}
            <div className="form-checkbox">
              <input type="checkbox" required />
              <label>I declare that the details are correct to the best of my knowledge.</label>
            </div>
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
