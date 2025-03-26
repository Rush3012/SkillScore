import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css"; // Ensure this CSS file exists for styling
import logo from "../assets/skillscore_logo.png";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        // Hardcoded credentials
        const hardcodedEmail = "admin@nitc.ac.in";
        const hardcodedPassword = "pass123";

        if (email === hardcodedEmail && password === hardcodedPassword) {
            localStorage.setItem("adminToken", "hardcoded_admin_token"); // Fake token storage
            navigate("/admin/dashboard"); // Redirect to Admin Dashboard
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-left">
                <img src={logo} alt="SkillScore Logo" className="admin-logo" />
                <h1>SkillScore</h1>
                <p>Track Your Activity Points</p>
            </div>
            <div className="admin-login-right">
                <div className="admin-login-card">
                    <h2>Admin Login</h2>
                    <p>Welcome back, Admin!</p>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;