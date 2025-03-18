
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/stu_sidebar";
import Header from "../components/stu_header";
import "./EventList.css";
import noImage from "../assets/no_image.png";

const Events = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/events", {
      credentials: "include",})
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched events:", data);

        const sortedEvents = data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

        setEvents(sortedEvents);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <div className="events-page-container">
      <Sidebar role="STUDENT" />
      <div className="events-content">
        <Header />
        <div className="events-section">
          <div className="events-header">
            <h2>Upcoming Events</h2>
          </div>

          <div className="events-grid">
            {events && events.length > 0 ? (
              events.map((event) => (
                <div
                  key={event.id}
                  className="event-card"
                  onClick={() => navigate(`/event/${event.id}`)}
                >
                  <img
                    src={event.image || noImage}
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
              <p>No events available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;

