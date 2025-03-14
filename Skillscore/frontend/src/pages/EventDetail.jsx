import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams(); // ✅ Get event ID from URL
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/events/${id}`)
      .then(response => response.json())
      .then(data => setEvent(data))
      .catch(error => console.error("Error fetching event details:", error));
  }, [id]);

  if (!event) return <p>Loading event details...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{event.name}</h2>
      <img
        src={event.image || "https://via.placeholder.com/150"}
        alt={event.name}
        className="w-full h-48 object-cover rounded-md mt-2"
      />
      <p className="mt-2 text-gray-700">{event.description}</p>
      <p className="mt-2"><strong>Points:</strong> {event.points}</p>
      <p><strong>Date:</strong> {event.startDate} - {event.endDate}</p>
      <p><strong>Time:</strong> {event.time}</p>
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
    </div>
  );
};

export default EventDetails;
