

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../components/fac_sidebar";
// import Header from "../components/fac_header";
// import "./FacultyEvent.css";
// import noImage from "../assets/no_image.png";

// const Events = () => {
//   const [events, setEvents] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch("http://localhost:8080/api/events", {
//       credentials: "include",})
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Fetched events:", data);
//         setEvents(data);
//       })
//       .catch((error) => console.error("Error fetching events:", error));
//   }, []);

//   return (
//     <div className="events-page-container">
//       <Sidebar role="FACULTY" />
//       <div className="events-content">
//         <Header />
//         <div className="events-section">
//           <div className="events-header">
//             <h2>Upcoming Events</h2>
//           </div>
          

//           <div className="events-grid">
//             {events && events.length > 0 ? (
//               events.map((event) => (
//                 <div
//                   key={event.id}
//                   className="event-card"
//                   onClick={() => navigate(`/event/${event.id}`)}
//                 >
//                   <img
//                     src={event.image || noImage}
//                     alt={event.name}
//                     className="event-image"
//                   />
//                   <div className="event-info">
//                     <h3>{event.name}</h3>
//                     <p>{event.startDate} - {event.endDate}</p>
//                     <p>{event.time}</p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>No events available</p>
//             )}
//             <button className="add-faculty-event-btn" onClick={() => navigate("/faculty-events/new")}>
//           <span className="add-event-icon">+</span>
//           <span className="add-event-text">Add New Event</span>
//         </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Events;

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
        const sortedEvents = data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

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

