// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";


// const EventList = () => {
//   const [events, setEvents] = useState([]);
//   const navigate = useNavigate(); 


//   useEffect(() => {
//     fetch("http://localhost:8080/api/events")
//       .then(response => response.json()) 
//       .then(data => {
//         console.log("Fetched events:", data);
//         setEvents(data); 
//       })
//       .catch(error => console.error("Error fetching events:", error));
      
      
//     }, []);
  


//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Events</h2>
//       <div className="flex space-x-4 mb-4">
//           <button className="bg-blue-500 text-white p-2 rounded" onClick={() => navigate("/events/add")}>
//             Add Event
//           </button>
//           <button className="bg-green-500 text-white p-2 rounded" onClick={() => navigate("/events/my-events")}>
//             My Events
//           </button>
//         </div>
//       <div className="grid grid-cols-3 gap-4">
//         {events && events.length > 0 ? (
//             events.map(event => (
//           <div 
//             key={event.id} 
//             className="cursor-pointer border p-2 rounded-lg shadow-md hover:bg-gray-100"
//             onClick={() => navigate(`/event/${event.id}`)}
//           >
//             <img 
//               src={event.image || "https://via.placeholder.com/150"} 
//               alt={event.name} 
//               className="w-full h-32 object-cover rounded-md"
//             />
//             <h3 className="text-lg font-semibold mt-2">{event.name}</h3>
//           </div>))
//         ) : (
//             <p>No event available</p>
//         )
//     }
//       </div>
//     </div>
//   );
// };

// export default EventList;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FacultySidebar from "../components/fac_sidebar"; 
import FacultyHeader from "../components/fac_header"; 
import "./FacultyEvent.css"; // Ensure styles match the new class names
import noImage from "../assets/no_image.png"; 

const FacultyEvents = () => {
  const [events, setEvents] = useState([]); // State for events
  const navigate = useNavigate();

  // Fetch events from backend
  useEffect(() => {
    fetch("http://localhost:8080/api/events")
      .then(response => response.json()) 
      .then(data => {
        console.log("Fetched events:", data);
        setEvents(data); 
      })
      .catch(error => console.error("Error fetching events:", error));
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <FacultySidebar role="FACULTY" className="w-1/5" />
      
      {/* Main Content */}
      <div className="w-4/5 p-4">
        <FacultyHeader name="Renjith R" role="Faculty" />
        
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Faculty-Managed Events</h2>

          {/* Buttons for adding and managing events */}
          <div className="flex space-x-4 mb-4">
            <button className="bg-blue-500 text-white p-2 rounded" onClick={() => navigate("/faculty-events/new")}>
              Add Event
            </button>
            <button className="bg-green-500 text-white p-2 rounded" onClick={() => navigate("/faculty-events/my-events")}>
              My Events
            </button>
          </div>

          {/* Event Grid */}
          <div className="grid grid-cols-3 gap-4">
            {events.length > 0 ? (
              events.map(event => (
                <div 
                  key={event.id} 
                  className="cursor-pointer border p-2 rounded-lg shadow-md hover:bg-gray-100"
                  onClick={() => navigate(`/faculty-events/${event.id}`, { state: event })}
                >
                  <img 
                    src={event.image || noImage} 
                    alt={event.name} 
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <h3 className="text-lg font-semibold mt-2">{event.name}</h3>
                  <p className="text-sm text-gray-600">{event.date} • {event.time}</p>
                  <p className="text-sm text-gray-600">{event.venue}</p>
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

export default FacultyEvents;

