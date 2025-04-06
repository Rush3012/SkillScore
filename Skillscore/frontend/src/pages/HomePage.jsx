import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import logo from "../assets/skillscore_logo.png";

const HomePage = () => {
  const navigate = useNavigate();
  const googleButtonRef = useRef(null);

  useEffect(() => {
    if (window.google && googleButtonRef.current) {
      window.google.accounts.id.initialize({
        client_id: "572154029570-08ta74tbukt2mhm88f0jva6oaev9jqei.apps.googleusercontent.com",
        callback: handleGoogleLogin,
      });

      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: "outline",
        size: "large",
      });
    }
  }, []);






  // const handleGoogleLogin = async (response) => {
  //   try {
  //     const { credential } = response;
  //     const res = await fetch("http://localhost:8080/api/auth/login", {
  //       method: "POST",
  //       credentials: "include",
  //       headers: { 
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${credential}` // Send JWT
  //       },
  //       body: JSON.stringify({}),
  //     });
  
  //     if (!res.ok) {
  //       const errorData = await res.json();
  //       throw new Error(errorData.error || "Login failed");
  //     }
  
  //     const data = await res.json();
      
  //     // Store session data
  //     sessionStorage.setItem("userId", data.userId);
  //     sessionStorage.setItem("userRole", data.role);
  //     sessionStorage.setItem("userEmail", data.email);
  
  //     // Redirect
  //     navigate(data.role.toLowerCase() === "student" 
  //       ? "/StudentDashboard" 
  //       : "/FacultyDashboard");
  
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     alert(error.message || "Google Sign-In failed");
  //   }
  // };


  const handleGoogleLogin = async (response) => {
    try {
      const { credential } = response;
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        credentials: "include", // Critical for session cookies
        headers: { 
          "Authorization": `Bearer ${credential}`,
          "Content-Type": "application/json"
        }
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Login failed");
      }
  
      const data = await res.json();
      
      // Store all auth data
      sessionStorage.setItem("userId", data.userId);
      sessionStorage.setItem("userRole", data.role);
      sessionStorage.setItem("isAuthenticated", "true");
      
      // Force reload to ensure all components get fresh auth state
      window.location.href = data.role === "STUDENT" 
        ? "/StudentDashboard" 
        : "/FacultyDashboard";
        
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message);
    }
  };




  // if (res.ok) {
  //   const data = await res.json();
  //   console.log("Login response:", data);
    
  //   if (data.userId && data.role) {
      
  //     sessionStorage.setItem("userId", data.userId);
  //     navigate(data.role === "student" ? "/student-dashboard" : "/faculty-dashboard");
  //   }
  // }



  return (
    <div className="homepage-container">
      <div className="left-panel">
        <img src={logo} alt="SkillScore Logo" />
        <h1>SkillScore</h1>
        <p>Track Your Activity Points</p>
      </div>

      <div className="right-panel">
        <div className="login-card">
          <h2>Login</h2>
          <p>Welcome back to SkillScore!</p>

          <div ref={googleButtonRef}></div> 
        </div>
      </div>
    </div>
  );
};

export default HomePage;
