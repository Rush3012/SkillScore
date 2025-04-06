import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css"; // Import the CSS file
import logo from "../assets/skillscore_logo.png";

const HomePage = () => {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include", // Include cookies in the request
    })
      .then(response => response.json())
      .then(data => {
        if (data.userId && data.role) {
          const dashboardPath =
          data.role === "student"
            ? "/StudentDashboard"
            : "/FacultyDashboard";

          navigate(dashboardPath); // Use React Router's navigate function
        } else {
          setError(data.error || "Invalid username or password");
        }
      })
      .catch(error => {
        console.error("Error:", error);
        setError("Something went wrong. Please try again.");
      });
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

          {/* Login Inputs */}
          <input
            type="text"
            className="input-field"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          <a href="http://localhost:8080/oauth2/authorization/google">
  <button>Login with Google</button>
</a>

        </div>
      </div>
    </div>
  );
};

export default HomePage;

