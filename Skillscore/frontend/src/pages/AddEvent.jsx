// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AddEvent = () => {
//     const [eventData, setEventData] = useState({
//         name: "",
//         description: "",
//         points: "",
//         startDate: "",
//         endDate: "",
//         time: "",
//         facultyId: "",
//     });
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setEventData({ ...eventData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formattedData = {
//             name: eventData.name,
//             description: eventData.description,
//             points: Number(eventData.points),  // Ensure it's a number
//             startDate: eventData.startDate,
//             endDate: eventData.endDate,
//             time: eventData.time,
//             faculty: { id: Number(eventData.facultyId) }  // Send faculty as an object
//         };
        
//         try {
//             const response = await fetch("http://localhost:8080/api/events/add", {
//                 credentials: "include",
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(formattedData),
//             });

//             if (response.ok) {
//                 alert("Event added successfully!");
//                 navigate("/events");
//                 setEventData({
//                     name: "",
//                     description: "",
//                     points: "",
//                     startDate: "",
//                     endDate: "",
//                     time: "",
//                     facultyId: "",
//                 });
//             } else {
//                 alert("Failed to add event. Try again.");
//             }
//         } catch (error) {
//             console.error("Error:", error);
//         }
//     };

//     return (
//         <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
//             <h2 className="text-2xl font-semibold mb-4">Add New Event</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <input type="text" name="name" value={eventData.name} onChange={handleChange} placeholder="Event Name" className="w-full p-2 border rounded" required />
//                 <textarea name="description" value={eventData.description} onChange={handleChange} placeholder="Event Description" className="w-full p-2 border rounded" required />
//                 <input type="number" name="points" value={eventData.points} onChange={handleChange} placeholder="Points" className="w-full p-2 border rounded" required />
//                 <input type="date" name="startDate" value={eventData.startDate} onChange={handleChange} className="w-full p-2 border rounded" required />
//                 <input type="date" name="endDate" value={eventData.endDate} onChange={handleChange} className="w-full p-2 border rounded" required />
//                 <input type="time" name="time" value={eventData.time} onChange={handleChange} className="w-full p-2 border rounded" required />
//                 <input type="text" name="facultyId" value={eventData.facultyId} onChange={handleChange} placeholder="Faculty ID" className="w-full p-2 border rounded" required />
//                 <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Add Event</button>
//             </form>
//         </div>
//     );
// };

// export default AddEvent;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEvent = () => {
    const [eventData, setEventData] = useState({
        name: "",
        description: "",
        points: "",
        startDate: "",
        endDate: "",
        time: "",
        facultyId: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        

        const formattedData = {
            name: eventData.name,
            description: eventData.description,
            points: Number(eventData.points),
            startDate: eventData.startDate,
            endDate: eventData.endDate,
            time: eventData.time,
            faculty: { facultyId: Number(eventData.facultyId) }
        };
        
        try {
            const response = await fetch("http://localhost:8080/api/events/add", {
                credentials: "include",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(formattedData),
            });
            

            if (response.ok) {
                alert("Event added successfully!");
                navigate("/FacultyEvents");
                setEventData({
                    name: "",
                    description: "",
                    points: "",
                    startDate: "",
                    endDate: "",
                    time: "",
                    facultyId: "",
                });
            } else {
                alert("Failed to add event. Try again.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-semibold mb-4">Add New Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="name" value={eventData.name} onChange={handleChange} placeholder="Event Name" required />
                <textarea name="description" value={eventData.description} onChange={handleChange} placeholder="Event Description" required />
                <input type="number" name="points" value={eventData.points} onChange={handleChange} placeholder="Points" required />
                <input type="date" name="startDate" value={eventData.startDate} onChange={handleChange} required />
                <input type="date" name="endDate" value={eventData.endDate} onChange={handleChange} required />
                <input type="time" name="time" value={eventData.time} onChange={handleChange} required />
                <input type="text" name="facultyId" value={eventData.facultyId} onChange={handleChange} placeholder="Faculty ID" required />
                <button type="submit">Add Event</button>
            </form>
        </div>
    );
};

export default AddEvent;

