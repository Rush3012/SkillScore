import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const EventList = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate(); 


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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Events</h2>
      <div className="flex space-x-4 mb-4">
          <button className="bg-blue-500 text-white p-2 rounded" onClick={() => navigate("/events/add")}>
            Add Event
          </button>
          <button className="bg-green-500 text-white p-2 rounded" onClick={() => navigate("/events/my-events")}>
            My Events
          </button>
        </div>
      <div className="grid grid-cols-3 gap-4">
        {events && events.length > 0 ? (
            events.map(event => (
          <div 
            key={event.id} 
            className="cursor-pointer border p-2 rounded-lg shadow-md hover:bg-gray-100"
            onClick={() => navigate(`/event/${event.id}`)}
          >
            <img 
              src={event.image || "https://via.placeholder.com/150"} 
              alt={event.name} 
              className="w-full h-32 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-2">{event.name}</h3>
          </div>))
        ) : (
            <p>No event available</p>
        )
    }
      </div>
    </div>
  );
};

export default EventList;
