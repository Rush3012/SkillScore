import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/stu_sidebar";
import Header from "../components/stu_header";
import "./EventDetails.css";
import noImage from "../assets/no_image.png";

const EventDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state;

  if (!event) {
    return <h2>Event not found!</h2>;
  }

  return (
    <div className="event-details-container">
      {/* Sidebar */}
      <Sidebar role="STUDENT" />

      {/* Main Content */}
      <div className="event-details-content">
        <Header />
        <div className="event-details">
          <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

          <h2>{event.title}</h2>

          <img src={event.image || noImage} alt={event.title} className="event-image-large" />

          <div className="event-info">
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Venue:</strong> {event.venue}</p>
          </div>

          <div className="event-description">
            <h3>About the Event</h3>
            <p>{event.description || "No description available for this event."}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
