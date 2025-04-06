

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FacultySidebar from "../components/fac_sidebar"; 
import FacultyHeader from "../components/fac_header"; 
import "./AddEvent.css"; 

const AddEvent = () => {
  const [fac, setFac] = useState(null);
  const [preview, setPreview] = useState(null);
  

  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    points: "",
    startDate: "",
    endDate: "",
    time: "",
    facultyId: "",
    registrationLink: "",
    activityType: "",
    venue: "",
    regFee: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
          const fetchFacultyData = async () => {
              try {
                  const userResponse = await fetch("https://localhost:8080/api/auth/user", { credentials: "include" });
                  if (!userResponse.ok) throw new Error("Failed to fetch user profile");
  
                  const userData = await userResponse.json();
                  const userId = userData.userId;
  
                  const facultyResponse = await fetch(`http://localhost:8080/api/faculty/by-user/${userId}`, {
                      credentials: "include",
                  });
  
                  if (!facultyResponse.ok) throw new Error("Failed to fetch faculty data");
  
                  const facultyData = await facultyResponse.json();
                  setFac(facultyData);
  
              } catch (error) {
                  console.error("Error fetching faculty data:", error);
                  setError(error.message);
              } 
          };
  
          fetchFacultyData();
      }, []);

      const handleChange = (e) => {
        const { name, value } = e.target;
      
        if (name === "startDate") {
          const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
          if (value < today) {
            alert("Start date cannot be in the past.");
            return;
          }
        }
      
        if (name === "endDate") {
          if (value < eventData.startDate) {
            alert("End date must be after the start date.");
            return;
          }
        }
      
        setEventData({ ...eventData, [name]: value });
      };
      

      const handleFileChange = (e) => {
        const file = e.target.files[0];
      
        if (file) {
          const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
      
          if (!allowedTypes.includes(file.type)) {
            alert("Invalid file type! Please upload an image (PNG, JPG, JPEG, GIF).");
            return;
          }
      
          setEventData({ ...eventData, poster: file });
          const imageUrl = URL.createObjectURL(file);
          setPreview(imageUrl);
  
        }
      };
      

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const formattedData = {
        name: eventData.name,
        description: eventData.description,
        points: Number(eventData.points),
        startDate: eventData.startDate,
        endDate: eventData.endDate,
        time: eventData.time,
        faculty: { facultyId: Number(fac.facultyId) }, 
        registrationLink: eventData.registrationLink,
        activityType: eventData.activityType,
        regFee: eventData.regFee,
        venue: eventData.venue
    };
    
    formData.append("eventData", JSON.stringify(formattedData)); 
    if (eventData.poster) {
        formData.append("poster", eventData.poster);
    }
    try {
      const response = await fetch("http://localhost:8080/api/events/add", {
        credentials: "include",
        method: "POST",
        body: formData,

        // headers: {
        //   "Content-Type": "application/json",
        //   "Accept": "application/json"
        // },
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
          registrationLink: "",
          poster: null,
          type: "",
          regFee: "",
          venue: ""
        });
      } else {
        alert("Failed to add event. Try again.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <FacultySidebar /> {/* Sidebar for navigation */}
      <div className="main-content">
        <FacultyHeader /> {/* Header for consistency */}
        
        <div className="add-event-container">
          <div className="add-event-content">
            <h2 className="add-event-title">Add New Event</h2>

            <div className="event-tabs">
              <button className="active-tab">Add Event</button>
              <button className="inactive-tab" onClick={() => navigate("/FacultyEvents")}>Event List</button>
            </div>

            <form className="add-event-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>* Event Name:</label>
                <input type="text" name="name" value={eventData.name} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>* Event Type:</label>
                <select name="activityType" value={eventData.activityType} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="Institute Level">Institute Level</option>
                  <option value="Department Level">Department Level</option>
                </select>
              </div>

              <div className="form-group">
                <label>* Event Description:</label>
                <textarea name="description" value={eventData.description} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>* Points:</label>
                <input type="number" name="points" value={eventData.points} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>* Start Date:</label>
                <input type="date" name="startDate" value={eventData.startDate} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>* End Date:</label>
                <input type="date" name="endDate" value={eventData.endDate} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>* Time:</label>
                <input type="time" name="time" value={eventData.time} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>* Venue:</label>
                <input type="text" name="venue" value={eventData.venue} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>* Registration Fee:</label>
                <input type="text" name="regFee" value={eventData.regFee} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>* Registration Link:</label>
                <input type="text" name="registrationLink" value={eventData.registrationLink} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Upload Poster:</label>
                <input type="file" onChange={handleFileChange} />
              </div>
              {preview && (
  <div className="image-preview">
    <img src={preview} alt="Event Poster Preview" style={{ width: "200px", height: "200px", marginTop: "10px" }} />
  </div>
)}

              <button type="submit" className="submit-btn">SUBMIT</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
