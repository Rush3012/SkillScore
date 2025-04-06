

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import navigation hook
// import FacultySidebar from "../components/fac_sidebar"; 
// import FacultyHeader from "../components/fac_header"; 

// import "./FacultyStudents.css"; 

// const FacultyStudents = () => {
//     const [faculty, setFaculty] = useState(null);
//     const [students, setStudents] = useState([]);
//     const [searchTerm, setSearchTerm] = useState(""); // Search term state
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [count, setCount] = useState(null);
//     const navigate = useNavigate(); // React Router navigation

//     useEffect(() => {
//         const fetchFaculty = async () => {
//             try {
//                 const response = await fetch("/api/auth/profile", { credentials: "include" });
//                 if (!response.ok) throw new Error("Failed to fetch faculty profile");

//                 const data = await response.json();
//                 const userId = data.userId; 

//                 const facultyResponse = await fetch(`http://localhost:8080/api/faculty/by-user/${userId}`, { credentials: "include" });
//                 if (!facultyResponse.ok) throw new Error("Failed to fetch faculty data");

//                 const facultyData = await facultyResponse.json();
//                 setFaculty(facultyData);
//             } catch (error) {
//                 console.error("Error fetching faculty:", error);
//                 setError(error.message);
//             }
//         };
//         fetchFaculty();
//     }, []);

//     useEffect(() => {
//         if (!faculty) return;

//         const fetchStudents = async () => {
//             try {
//                 const response = await fetch(`http://localhost:8080/api/students/faculty/${faculty.facultyId}`, { credentials: "include" });
//                 if (!response.ok) throw new Error("Failed to fetch students");

//                 const studentsData = await response.json();
//                 console.log("Fetched students:", studentsData);
//                 setStudents(studentsData);
//             } catch (error) {
//                 console.error("Error fetching students:", error);
//                 setError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchStudents();
//     }, [faculty]);


    
//     // Filter students based on search input
//     const filteredStudents = students.filter((student) =>
//         student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     // ✅ Navigate to Student Report Page when a row is clicked
//     const handleRowClick = (rollNumber) => {
//         navigate(`/student-report/${rollNumber}`);
//     };

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;

//     return (
//         <div className="faculty-students-container">
//             {/* Sidebar */}
//             <FacultySidebar />
            
//             {/* Main Content */}
//             <div className="faculty-students-content">
//                 {/* Faculty Header */}
//                 <FacultyHeader />

//                 <h2 className="title">My Students</h2>

//                 {/* Search Bar */}
//                 <input
//                     type="text"
//                     className="search-bar"
//                     placeholder="Search by name or roll number..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />

//                 {/* Students Table */}
//                 <table className="students-table">
//                     <thead>
//                         <tr>
//                             <th>Roll Number</th>
//                             <th>Name</th>
//                             <th>Total Points</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredStudents.length > 0 ? (
//                             filteredStudents.map((student) => (
//                                 <tr key={student.rollNumber} onClick={() => handleRowClick(student.rollNumber)} className="clickable-row">
//                                     <td>{student.rollNumber}</td>
//                                     <td>{student.name}</td>
//                                     <td>{student.totalPoints}</td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="4">No students found.</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default FacultyStudents;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FacultySidebar from "../components/fac_sidebar";
import FacultyHeader from "../components/fac_header";

import "./FacultyStudents.css"; 

const FacultyStudents = () => {
    const [faculty, setFaculty] = useState(null);
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null); // File upload state
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                const response = await fetch("/api/auth/user", { credentials: "include" });
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

    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRowClick = (rollNumber) => {
        navigate(`/student-report/${rollNumber}`);
    };

    // 🔹 Handle File Upload
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select an Excel file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        setUploading(true);
        try {
            const response = await fetch(`http://localhost:8080/api/files/csv/student/upload/${faculty.facultyId}`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("File upload failed");
            }

            alert("File uploaded successfully!");
            setSelectedFile(null);
            window.location.reload(); // Refresh page to update student list
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Error uploading file");
        } finally {
            setUploading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="faculty-students-container">
            <FacultySidebar />
            
            <div className="faculty-students-content">
                <FacultyHeader />

                <h2 className="title">My Students</h2>

                {/* 🔍 Search Bar */}
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search by name or roll number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* 🔺 File Upload Section */}
                <div className="upload-section">
                    <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
                    <button onClick={handleUpload} disabled={uploading}>
                        {uploading ? "Uploading..." : "Upload Excel"}
                    </button>
                </div>

                {/* 📋 Students Table */}
                <table className="students-table">
                    <thead>
                        <tr>
                            <th>Roll Number</th>
                            <th>Name</th>
                            <th>Total Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.length > 0 ? (
                            filteredStudents.map((student) => (
                                <tr key={student.rollNumber} onClick={() => handleRowClick(student.rollNumber)} className="clickable-row">
                                    <td>{student.rollNumber}</td>
                                    <td>{student.name}</td>
                                    <td>{student.totalPoints}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No students found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FacultyStudents;