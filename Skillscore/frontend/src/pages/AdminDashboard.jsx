import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import logo from "../assets/skillscore_logo.png";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/AdminLogin");
    };

    // File upload handler
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

        try {
            const response = await fetch("http://localhost:8080/api/files/csv/faculty/upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Faculty data uploaded successfully.");
            } else {
                alert("Error uploading faculty data.");
            }
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Upload failed.");
        }
    };

    return (
        <div className="admin-dashboard">
            {/* Sidebar */}
            <div className="sidebar">
            <img src={logo} alt="SkillScore Logo" className="sidebar-logo" />
                <h2>Skillscore</h2>
                
                <ul>
                    <li onClick={() => navigate("/admin/dashboard")}>Dashboard</li>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>

                </ul>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* Header */}
                <div className="header">
                    <h2>Welcome Admin!!</h2>
                    <div className="admin-info">
                        <span> admin@nitc.ac.in</span>
                    </div>
                </div>

                {/* Upload Faculty Section */}
                <div className="upload-container">
                    <h2>Upload Faculty List</h2>
                    <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
                    <button onClick={handleUpload}>Upload</button>

                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;