import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FacultySidebar from "../components/fac_sidebar"; // Sidebar
import FacultyHeader from "../components/fac_header"; // Header
import "./AddEvent.css"; // Ensure the styles match the UI

const AddEvent = () => {
  const [eventData, setEventData] = useState({
    name: "",
    eventCoordinator: "",
    category: "",
    date: "",
    points: "",
    details: "",
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
    formData.append("name", eventData.name);
    formData.append("eventCoordinator", eventData.eventCoordinator);
    formData.append("category", eventData.category);
    formData.append("date", eventData.date);
    formData.append("points", eventData.points);
    formData.append("details", eventData.details);
    if (eventData.poster) formData.append("poster", eventData.poster);

    try {
      const response = await fetch("http://localhost:8080/api/events/add", {
        credentials: "include",
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Event added successfully!");
        navigate("/FacultyEvents");
        setEventData({
          name: "",
          eventCoordinator: "",
          category: "",
          date: "",
          points: "",
          details: "",
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
                <label>* Event name:</label>
                <input type="text" name="name" value={eventData.name} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>* Event Coordinator:</label>
                <input type="text" name="eventCoordinator" value={eventData.eventCoordinator} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>* Activity Category:</label>
                <select name="category" value={eventData.category} onChange={handleChange} required>
                  <option value="">Select Category</option>
                  <option value="Technical">Technical</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>

              <div className="form-group">
                <label>* Date of the Event:</label>
                <input type="date" name="date" value={eventData.date} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>* Points Expected:</label>
                <input type="number" name="points" value={eventData.points} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Upload Poster:</label>
                <input type="file" onChange={handleFileChange} />
              </div>

              <div className="form-group">
                <label>* Add Event Details:</label>
                <textarea name="details" value={eventData.details} onChange={handleChange} required placeholder="Enter..." />
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
