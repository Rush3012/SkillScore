

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/fac_sidebar";
import Header from "../components/fac_header";
import "./FacultyEvent.css";
import noImage from "../assets/no_image.png";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Store search input
  const navigate = useNavigate();

  // Fetch events from backend
  useEffect(() => {
    fetch("http://localhost:8080/api/events", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched events:", data);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcomingEvents = data.filter(event => 
          new Date(event.startDate) >= today
        );

        // Sort events by start date (earliest first)
        const sortedEvents = upcomingEvents.sort((a, b) => 
          new Date(a.startDate) - new Date(b.startDate)
        );
        setEvents(sortedEvents);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const filteredEvents = events.filter(event => 
    event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.startDate.includes(searchQuery) || 
    event.endDate.includes(searchQuery)
  );


  return (
    <div className="events-page-container">
      {/* Sidebar */}
      <Sidebar role="FACULTY" />

      {/* Main Content */}
      <div className="events-content">
        <Header/>

        

        <div className="events-section">
          <h2 className="events-header">Upcoming Events</h2>
          {/* 🔍 Search Bar */}
        <input
          type="text"
          placeholder="Search events..."
          className="faculty-search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

          {/* Event Grid */}
          <div className="events-grid">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="event-card"
                  onClick={() => navigate(`/faculty/event/${event.id}`)}
                >
                  <img
                    src={event.image ? `http://localhost:8080/api/files/${event.image}` : noImage}
                    alt={event.name}
                    className="event-image"
                  />
                  
                  <div className="event-info">
                    <h3>{event.name}</h3>
                    <p>{event.startDate} - {event.endDate}</p>
                    <p>{event.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-events">No events available</p>
            )}
          </div>
        </div>

        {/* "Add Event" Button */}
        <button className="add-event-btn" onClick={() => navigate("/events/add")}>
          <span className="add-event-icon">+</span>
          <span className="add-event-text">Add New Event</span>
        </button>
      </div>
    </div>
  );
};

export default Events;

