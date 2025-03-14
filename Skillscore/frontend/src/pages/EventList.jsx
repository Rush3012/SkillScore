import { useEffect, useState } from "react";


const EventList = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

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
      <div className="grid grid-cols-3 gap-4">
        {events && events.length > 0 ? (
            events.map(event => (
          <div 
            key={event.id} 
            className="cursor-pointer border p-2 rounded-lg shadow-md hover:bg-gray-100"
            onClick={() => setSelectedEvent(event)}
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

      {selectedEvent && (
        <div className="mt-6 p-4 border rounded-lg shadow-md bg-white">
          <h2 className="text-xl font-bold">{selectedEvent.name}</h2>
          <img 
            src={selectedEvent.image || "https://via.placeholder.com/150"} 
            alt={selectedEvent.name} 
            className="w-full h-48 object-cover rounded-md mt-2"
          />
          <p className="mt-2 text-gray-700">{selectedEvent.description}</p>
          <p className="mt-2"><strong>Points:</strong> {selectedEvent.points}</p>
          <p><strong>Date:</strong> {selectedEvent.startDate} - {selectedEvent.endDate}</p>
          <p><strong>Time:</strong> {selectedEvent.time}</p>
          <p className="mt-2">
            <a href={selectedEvent.registrationLink} target="_blank" rel="noopener noreferrer" 
               className="text-blue-500 underline">
              Register Here
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default EventList;
