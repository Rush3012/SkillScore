

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import FacultySidebar from "../components/fac_sidebar"; 
import FacultyHeader from "../components/fac_header"; 

import "./FacultyStudents.css"; 

const FacultyStudents = () => {
    const [faculty, setFaculty] = useState(null);
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // Search term state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // React Router navigation

    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                const response = await fetch("/api/auth/profile", { credentials: "include" });
                if (!response.ok) throw new Error("Failed to fetch faculty profile");

                const data = await response.json();
                const userId = data.userId; 

                const facultyResponse = await fetch(`http://localhost:8080/api/faculty/by-user/${userId}`, { credentials: "include" });
                if (!facultyResponse.ok) throw new Error("Failed to fetch faculty data");

                const facultyData = await facultyResponse.json();
                setFaculty(facultyData);
            } catch (error) {
                console.error("Error fetching faculty:", error);
                setError(error.message);
            }
        };
        fetchFaculty();
    }, []);

    useEffect(() => {
        if (!faculty) return;

        const fetchStudents = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/students/faculty/${faculty.facultyId}`, { credentials: "include" });
                if (!response.ok) throw new Error("Failed to fetch students");

                const studentsData = await response.json();
                console.log("Fetched students:", studentsData);
                setStudents(studentsData);
            } catch (error) {
                console.error("Error fetching students:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, [faculty]);

    // Filter students based on search input
    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // ✅ Navigate to Student Report Page when a row is clicked
    const handleRowClick = (rollNumber) => {
        navigate(`/student-report/${rollNumber}`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="faculty-students-container">
            {/* Sidebar */}
            <FacultySidebar />
            
            {/* Main Content */}
            <div className="faculty-students-content">
                {/* Faculty Header */}
                <FacultyHeader />

                <h2 className="title">My Students</h2>

                {/* Search Bar */}
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search by name or roll number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* Students Table */}
                <table className="students-table">
                    <thead>
                        <tr>
                            <th>Roll Number</th>
                            <th>Name</th>
                            <th>Total Points</th>
                            <th>Requests</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.length > 0 ? (
                            filteredStudents.map((student) => (
                                <tr key={student.rollNumber} onClick={() => handleRowClick(student.rollNumber)} className="clickable-row">
                                    <td>{student.rollNumber}</td>
                                    <td>{student.name}</td>
                                    <td>{student.totalPoints}</td>
                                    <td>2</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No students found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FacultyStudents;
