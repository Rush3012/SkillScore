import React from "react";
import { useNavigate } from "react-router-dom";
import FacultySidebar from "../components/fac_sidebar"; // Faculty Sidebar
import FacultyHeader from "../components/fac_header"; // Faculty Header
import "./FacultyEvents.css"; // Ensure styles match the new class names
import noImage from "../assets/no_image.png";

// Faculty-managed events
const facultyEvents = [
  { id: 1, title: "Level-Up Seminar", date: "May 31", time: "11:00 AM", venue: "NLHC 202, NIT Calicut", description: "Enhance your teaching methods.", image: "" },
  { id: 2, title: "Innovation Fair", date: "June 13", time: "9:00 AM - 4:00 PM", venue: "Aryabhatta Hall, NIT Calicut", description: "Showcase new innovations.", image: "" },
  { id: 3, title: "AI & ML Hackathon", date: "June 25", time: "10:00 AM", venue: "CSED Lab 1, NIT Calicut", description: "An AI-focused coding competition.", image: "" },
];

const FacultyEvents = () => {
  const navigate = useNavigate();

  return (
    <div className="faculty-events-container">
      <FacultySidebar role="FACULTY" className="faculty-events-sidebar" />
      <div className="faculty-events-content">
        <FacultyHeader name="Renjith R" role="Faculty" />
       
        <div className="events-section">
          <div className="events-header">
          </div>

          <div className="faculty-events-grid">
            {facultyEvents.map((event) => (
              <div 
                key={event.id} 
                className="event-card" 
                onClick={() => navigate(`/faculty-events/${event.id}`, { state: event })}
              >
                <img src={event.image || noImage} alt={event.title} className="event-image" />
                <div className="event-info">
                  <h3>{event.title}</h3>
                  <p>{event.date}</p>
                  <p>{event.time}</p>
                  <p>{event.venue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add New Event Button - Positioned at Bottom Right */}
        <button className="add-faculty-event-btn" onClick={() => navigate("/faculty-events/new")}>
          <span className="add-event-icon">+</span>
          <span className="add-event-text">Add New Event</span>
        </button>
      </div>
    </div>
  );
};

export default FacultyEvents;
