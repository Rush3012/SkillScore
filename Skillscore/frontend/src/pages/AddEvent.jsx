

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FacultySidebar from "../components/fac_sidebar"; 
import FacultyHeader from "../components/fac_header"; 
import "./AddEvent.css"; 

const AddEvent = () => {
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    points: "",
    startDate: "",
    endDate: "",
    time: "",
    facultyId: "",
    poster: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleFileChange = (e) => {
    setEventData({ ...eventData, poster: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const formattedData = {
        name: eventData.name,
        description: eventData.description,
        points: Number(eventData.points),
        startDate: eventData.startDate,
        endDate: eventData.endDate,
        time: eventData.time,
        faculty: { facultyId: Number(eventData.facultyId) } 
    };
    
    formData.append("eventData", JSON.stringify(formattedData)); 
    if (eventData.poster) {
        formData.append("poster", eventData.poster);
    }
    try {
      const response = await fetch("http://localhost:8080/api/events/add", {
        credentials: "include",
        method: "POST",
        body: formData,

        // headers: {
        //   "Content-Type": "application/json",
        //   "Accept": "application/json"
        // },
      });

      if (response.ok) {
        alert("Event added successfully!");
        navigate("/FacultyEvents");
        setEventData({
          name: "",
          description: "",
          points: "",
          startDate: "",
          endDate: "",
          time: "",
          facultyId: "",
          poster: null,
        });
      } else {
        alert("Failed to add event. Try again.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <FacultySidebar /> {/* Sidebar for navigation */}
      <div className="main-content">
        <FacultyHeader /> {/* Header for consistency */}
        
        <div className="add-event-container">
          <div className="add-event-content">
            <h2 className="add-event-title">Add New Event</h2>

            <div className="event-tabs">
              <button className="active-tab">Add Event</button>
              <button className="inactive-tab" onClick={() => navigate("/FacultyEvents")}>Event List</button>
            </div>

            <form className="add-event-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>* Event Name:</label>
                <input type="text" name="name" value={eventData.name} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>* Event Description:</label>
                <textarea name="description" value={eventData.description} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>* Points:</label>
                <input type="number" name="points" value={eventData.points} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>* Start Date:</label>
                <input type="date" name="startDate" value={eventData.startDate} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>* End Date:</label>
                <input type="date" name="endDate" value={eventData.endDate} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>* Time:</label>
                <input type="time" name="time" value={eventData.time} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>* Faculty ID:</label>
                <input type="text" name="facultyId" value={eventData.facultyId} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Upload Poster:</label>
                <input type="file" onChange={handleFileChange} />
              </div>

              <button type="submit" className="submit-btn">SUBMIT</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
