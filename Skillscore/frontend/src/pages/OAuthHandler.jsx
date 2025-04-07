// src/components/OAuthHandler.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/auth/user", {
      credentials: "include", // to send session cookie
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.userId && data.role) {
          const dashboardPath =
            data.role === "student"
              ? "/StudentDashboard"
              : "/FacultyDashboard";
          navigate(dashboardPath);
        } else {
          navigate("/login"); // fallback
        }
      })
      .catch((err) => {
        console.error(err);
        navigate("/login");
      });
  }, [navigate]);

  return <p>Logging you in...</p>;
};

export default OAuthHandler;
