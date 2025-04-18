

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/stu_sidebar";
import Header from "../components/stu_header";
import "./EventDetails.css";
import noImage from "../assets/no_image.png";

const EventDetails = () => {
  const { id } = useParams(); // Get event ID from URL
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/events/${id}`,{credentials: "include"})
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch event details.");
        }
        return response.json();
      })
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading event details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!event) return <h2>Event not found!</h2>;

  return (
    <div className="event-details-container">
      {/* Sidebar */}
      <Sidebar role="STUDENT" />

      {/* Main Content */}
      <div className="event-details-content">
        <Header />
        <div className="event-details">
          <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

          <h2>{event.name}</h2>

           <img
                     src={event.image ? `http://localhost:8080/api/files/${event.image}` : noImage}
                     alt={event.name}
                     className="event-image"
                     
                   />

          <div className="event-info">
            <p><strong>Points:</strong> {event.points}</p>
            <p><strong>Date:</strong> {event.startDate} - {event.endDate}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Venue:</strong> {event.venue || "Not specified"}</p>
            <p><strong>Faculty Coordinator:</strong> {event.faculty.name}</p>
          </div>

          <div className="event-description">
            <h3>About the Event</h3>
            <p>{event.description || "No description available."}</p>
          </div>
          
          {event.registrationLink && (
            <p className="mt-2">
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Register Here
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;

