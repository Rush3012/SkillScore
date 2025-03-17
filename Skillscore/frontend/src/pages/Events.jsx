import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/stu_sidebar";
import Header from "../components/stu_header";
import "./Events.css";
import noImage from "../assets/no_image.png";
import ai from "../assets/ai_bootcamp.jpg";
import nss from "../assets/nss.jpg";
import film from "../assets/film.jpeg";

const events = [
  { id: 1, title: "AI Bootcamp", date: "March 13",time:"10:30 AM", venue:"NIT Calicut",description: "A workshop on AI technologies.", image: ai },
  { id: 2, title: "NSS Camp", date: "March 19",time:" 8:00 AM to 5:00 PM",venue:"ALPS Wayanad", description: "A community service camp.", image: nss },
  { id: 3, title: "Cinematography & Film Editing (Ragam)", date: "March 12 ",venue:"NLHC 101, NIT Calicut", time: "2:30 PM", description: "Learn the art of filmmaking.", image: film },
  { id: 4, title: "Ragam Workshop", date: "March 12" ,time :" 2:30 PM",venue:"Aryabhatta hall,NIT Calicut", description: "A hands-on workshop at Ragam Fest.", image: "" },
];

const Events = () => {
  const navigate = useNavigate();

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
            {events.map((event) => (
              <div 
                key={event.id} 
                className="event-card" 
                onClick={() => navigate(`/events/${event.id}`, { state: event })}
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
      </div>
    </div>
  );
};

export default Events;
