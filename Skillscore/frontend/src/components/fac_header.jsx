import React, { useState, useEffect } from "react";
import "./fac_header.css"; // Ensure this file exists
import profilePic from "../assets/profile.avif"; // Import the profile picture

const FacultyHeader = () => {
    const [faculty, setFaculty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const currentDate = new Date().toLocaleDateString("en-US", { 
        weekday: "long", year: "numeric", month: "long", day: "numeric" 
    });

    useEffect(() => {
        const fetchFacultyData = async () => {
            try {
                const userResponse = await fetch("/api/auth/profile", { credentials: "include" });
                if (!userResponse.ok) throw new Error("Failed to fetch user profile");

                const userData = await userResponse.json();
                const userId = userData.userId;

                const facultyResponse = await fetch(`http://localhost:8080/api/faculty/by-user/${userId}`, {
                    credentials: "include",
                });

                if (!facultyResponse.ok) throw new Error("Failed to fetch faculty data");

                const facultyData = await facultyResponse.json();
                setFaculty(facultyData);

            } catch (error) {
                console.error("Error fetching faculty data:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFacultyData();
    }, []);

    if (loading) return <div className="faculty-header">Loading...</div>;
    if (error) return <div className="faculty-header">Error: {error}</div>;

    return (
        <div className="faculty-header">
            <span className="date">{currentDate}</span>
            <div className="faculty-info">
                <img src={profilePic} alt="Profile" className="faculty-profile-pic" /> {/* Profile Picture */}
                <div className="faculty-details">
                    <span className="faculty-name"><strong>{faculty?.name || "Faculty"}</strong></span>
                    <span className="faculty-role">{"Faculty"}</span>
                </div>
            </div>
        </div>
    );
};

export default FacultyHeader;
