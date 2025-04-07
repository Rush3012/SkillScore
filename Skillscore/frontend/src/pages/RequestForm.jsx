import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/stu_sidebar";
import Header from "../components/stu_header";
import "./RequestForm.css";

const RequestForm = () => {
  const navigate = useNavigate();
  const { requestId } = useParams();
  const [events, setEvents] = useState([]); 
  const [selectedEvent, setSelectedEvent] = useState(""); 
  const [isOtherEvent, setIsOtherEvent] = useState(false); 
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [facultyList, setFacultyList] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);



  const [formData, setFormData] = useState({
    studentId: "", 
    eventId: "",
    eventName: "",
    activityCoordinatorId: "",
    category: "",
    date: "",
    points: "",
    description: "",
  });

  useEffect(() => {
    if (requestId) {
      setIsEditing(true); 
    } else {
      setIsEditing(false);
    }
  }, [requestId]);
  
  
  
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const userResponse = await fetch("http://localhost:8080/api/auth/user", { credentials: "include" });
        if (!userResponse.ok) throw new Error("Failed to fetch student data");

        const userData = await userResponse.json();
        const userId = userData.userId;

        const studentResponse = await fetch(`http://localhost:8080/api/students/by-user/${userId}`, {
          credentials: "include",
        });

        if (!studentResponse.ok) throw new Error("Failed to fetch student data");

        const studentData = await studentResponse.json();
        setStudent(studentData);
        setFormData((prev) => ({ ...prev, studentId: studentData.rollNumber })); 
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
        const response = await fetch("http://localhost:8080/api/events", { credentials: "include" });
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
    
        const pastEvents = data.filter(event => new Date(event.endDate) < today);
    
        const sortedPastEvents = pastEvents.sort((a, b) => 
          new Date(b.endDate) - new Date(a.endDate)
        );
    
        setEvents(sortedPastEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    const fetchFaculty = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/faculty", { credentials: "include" });
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

 useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/documents/files/${requestId}`, {credentials: "include"});
        if (!response.ok) throw new Error("Failed to fetch documents");
        const docus = await response.json();
        setUploadedFiles(docus);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
    if (isEditing){
      fetchDocuments();
      console.log("documents: ", uploadedFiles);
    }
  }, [requestId, isEditing]);

  useEffect(() => {
    if (isEditing) {
      const fetchRequestDetails = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/requests/${requestId}`, { credentials: "include" });
          if (!response.ok) throw new Error("Failed to fetch request details");
          const requestData = await response.json();
  
          setSelectedEvent(requestData.eventId || "other");
          setIsOtherEvent(!requestData.eventId); 
          
          if (requestData.other) {
            setFormData({
              studentId: requestData.studentId,
              eventId: "other",
              eventName: requestData.activityName || "",
              category: requestData.activityType || "",
              date: requestData.date || "",
              activityCoordinatorId: requestData.faculty? requestData.faculty.facultyId : "",
              points: requestData.points || "",
              description: requestData.description || "",
            });
          } else {
            setFormData({
              eventId: requestData.eventId,
              description: requestData.description
            });
          }
          console.log("how are u? ", selectedEvent.id);
          console.log("Form data: ", formData);
        } catch (error) {
          console.error("Error fetching request details:", error);
        }
      };
      fetchRequestDetails();
    }
    
  }, [isEditing, requestId]);

  


  const handleChange = (e) => {
    if (isEditing && selectedEvent !== "other" && e.target.name !== "description") return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleEventChange = (e) => {
    const eventId = e.target.value;
    setSelectedEvent(eventId);

    if (eventId === "other") {
      setIsOtherEvent(true);
      setFormData({ ...formData, eventId: "other", eventName: "", category: "", date: "", points: "", activityCoordinatorId: "" });
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
          points: selected.points,
          activityCoordinatorId: selected.faculty.facultyId, 
        });
      }
    }
  };

  // const handleFileChange = (e) => {
  //   if (uploadedFiles.length < 3) {
  //     setUploadedFiles([...uploadedFiles, e.target.files[0]]);
  //   }
  // };

  const handleFileChange = async (e) => {
    const newFile = e.target.files[0];
  
    if (!newFile || uploadedFiles.length >= 3) return;
  
    setUploadedFiles([...uploadedFiles, newFile]);
  
    // Upload new file immediately
    const fileData = new FormData();
    fileData.append("file", newFile);
    fileData.append("requestId", requestId); // Ensure requestId exists
  
    try {
      const uploadResponse = await fetch("http://localhost:8080/api/documents/upload", {
        method: "POST",
        body: fileData,
        credentials: "include"
      });
  
      if (!uploadResponse.ok) {
        console.error("Error uploading file:", await uploadResponse.text());
        setMessage("File upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Error uploading file.");
    }
  };
  

  const handleFacultyChange = (e) => {
    const selectedFacultyId = e.target.value;
    console.log("Selected Faculty ID:", selectedFacultyId);  
    setFormData({ ...formData, activityCoordinatorId: selectedFacultyId });
    formData.activityCoordinatorId = selectedFacultyId;
  };

  

  // const removeFile = async (fileId, index) => {
  //   try {
  //     console.log("documentzzzz:", uploadedFiles);
  //     const response = await fetch(`http://localhost:8080/api/documents/${fileId}`, {
  //       method: "DELETE",
  //     });
  
  //     if (!response.ok) throw new Error("Failed to delete file");
  
  //     // Update state after successful deletion
  //     setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  
  //     console.log("File deleted successfully!");
  //   } catch (error) {
  //     console.error("Error deleting file:", error);
  //   }
  // };

  const removeFile = async (file, index) => {
    if (file.id) {
      // If file exists in DB, delete from server
      try {
        const response = await fetch(`http://localhost:8080/api/documents/delete/${file.id}`, {
          method: "DELETE",
          credentials: "include"
        });
  
        if (!response.ok) {
          console.error("Error deleting file:", await response.text());
          setMessage("Failed to delete file.");
          return;
        }
      } catch (error) {
        console.error("Error deleting file:", error);
        setMessage("Error deleting file.");
      }
    }
  
    // Remove from state
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
      requestData.append("coordinatorId", formData.activityCoordinatorId);
      requestData.append("points", formData.points.toString());
    }
  
    requestData.append("eventId", finalEventId);
  
    try {
      const url = isEditing
        ? `http://localhost:8080/api/requests/update/${requestId}`
        : "http://localhost:8080/api/requests/submit";
      
      const method = isEditing ? "PUT" : "POST";
  
      const requestResponse = await fetch(url, { method, body: requestData , credentials: "include" });
  
      if (!requestResponse.ok) {
        const errorText = await requestResponse.text();
        console.error("Error submitting request:", errorText);
        setMessage("Failed to submit request.");
        return;
      }
  
      const request = await requestResponse.json(); 
      console.log("Request submitted successfully. ID:", request.requestId);
  
      if (uploadedFiles.length > 0) {
        for (const file of uploadedFiles) {
          if (file instanceof File) {  
            const fileData = new FormData();
            fileData.append("file", file);
            fileData.append("requestId", request.requestId);
  
            const uploadResponse = await fetch("http://localhost:8080/api/documents/upload", {
              method: "POST",
              body: fileData,
              credentials: "include"
            });
  
            if (!uploadResponse.ok) {
              console.error("Error uploading file:", await uploadResponse.text());
              setMessage("Request updated, but file upload failed.");
            }
          }
        }
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
                <select name="eventId" value={formData.eventId} onChange={handleEventChange} required>
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
                      <option value="Institute Level">Institute Level</option>
                      <option value="Department Level">Department Level</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Activity Coordinator:</label>
                    <select name="activityCoordinatorId" value={formData.activityCoordinatorId} onChange={handleFacultyChange} required>
                      <option value="">Select Activity Coordinator</option>
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
              {/* <div className="form-group full-width">
                <label>Upload Documents:*</label>

                <div className="file-upload-section">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="file-item">
                    <span>{file.name}</span>
                    <button type="button" onClick={() => removeFile(file.id, index)}>❌</button>
                  </div>
                ))}
                {uploadedFiles.length < 3 && (
                  <>
                    <input type="file" onChange={handleFileChange} />
                  </>
                )}
              </div>
            </div> */}
            <div className="form-group full-width">
  <label>Upload Documents:*</label>

  <div className="file-upload-section">
    {uploadedFiles.map((file, index) => (
      <div key={index} className="file-item">
        <span>{file.name || file.fileName}</span> {/* Handle both File and DB objects */}
        <button type="button" onClick={() => removeFile(file, index)}>❌</button>
      </div>
    ))}
    
    {uploadedFiles.length < 3 && (
      <>
        <input type="file" onChange={handleFileChange} />
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
            <button type="submit" className="submit-btn">{isEditing ? "Update" : "Submit"}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;
