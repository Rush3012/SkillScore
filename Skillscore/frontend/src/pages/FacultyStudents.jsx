import React, { useEffect, useState } from "react";
import FacultySidebar from "../components/fac_sidebar"; // Sidebar Component
import "./FacultyStudents.css"; // Styles

const FacultyStudents = () => {
    const [faculty, setFaculty] = useState(null);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ✅ Fetch Faculty Data
    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                const response = await fetch("/api/auth/profile", { credentials: "include" });
                if (!response.ok) throw new Error("Failed to fetch faculty profile");

                const data = await response.json();
                const userId = data.userId; // Extract userId

                // Fetch faculty details using userId
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

    // ✅ Fetch Students of this Faculty
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="faculty-students-container">
            {/* Sidebar */}
            <FacultySidebar />

            {/* Main Content */}
            <div className="faculty-students-content">
                <h2 className="title">My Students</h2>

                {/* Students Table */}
                <table className="students-table">
                    <thead>
                        <tr>
                            <th>Roll Number</th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Total Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? (
                            students.map((student) => (
                                <tr key={student.rollNumber}>
                                    <td>{student.rollNumber}</td>
                                    <td>{student.name}</td>
                                    <td>{student.department}</td>
                                    <td>{student.totalPoints}</td>
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
