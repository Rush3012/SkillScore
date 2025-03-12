import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css"; // Import the CSS file
import logo from "../assets/skillscore_logo.png";

const HomePage = () => {
  const [userType, setUserType] = useState("Student"); // Default is Student
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "rushda@gmail.com" && password === "123") {
      navigate("/StudentDashboard"); // Redirect to student dashboard
    } else if (email === "faculty@gmail.com" && password === "456") {
      navigate("/FacultyDashboard"); // Redirect to faculty dashboard
    } else {
      alert("Invalid email or password");
    }
  };


  return (
    <div className="homepage-container">
      {/* Left Branding Section */}
      <div className="left-panel">
        <img src={logo} alt="SkillScore Logo" />
        <h1>SkillScore</h1>
        <p>Track Your Activity Points</p>
      </div>

      {/* Right Login Section */}
      <div className="right-panel">
        <div className="login-card">
          <h2>Login</h2>
          <p>Welcome back to SkillScore!</p>

          {/* User Type Selection */}
          <select className="input-field" value={userType} onChange={(e) => setUserType(e.target.value)}>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>

          {/* Login Inputs */}
          <input
            type="email"
            className="input-field"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="input-field"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

          {/* Login Button */}
          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>

          
        </div>
      </div>
    </div>
  );
};

export default HomePage;
