import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaArrowLeft } from "react-icons/fa";
import { FaRegUser, FaClipboardList, FaCalendarAlt } from "react-icons/fa";
import logo from "../assets/skillscore_logo.png";
import userImg from "../assets/Student_image.jpeg";
import "./RequestForm.css";

const RequestForm = () => {
  const navigate = useNavigate(); // For navigation

  return (
    <div className="request-page-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src={logo} alt="SkillScore Logo" className="sidebar-logo" />
          <span className="logo-text">SkillScore</span>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li onClick={() => navigate("/StudentDashboard")}>
              <FaClipboardList /> Dashboard
            </li>
            <li onClick={() => navigate("/Profile")}>
              <FaRegUser /> Profile
            </li>
            <li onClick={() => navigate("/Events")}>
              <FaCalendarAlt /> Events
            </li>
            <li className="active" onClick={() => navigate("/Requests")}>
              <FaClipboardList /> Requests
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="request-form-content">
        {/* Header */}
        <header className="request-form-header">
          <FaArrowLeft className="back-icon" onClick={() => navigate(-1)} />
          <h1>Request Form</h1>
          <div className="user-profile">
            <span>Rushda P P</span>
            <img src={userImg} alt="User" className="profile-pic" />
          </div>
        </header>

        {/* Form */}
        <div className="form-container">
          <form>
            <div className="form-grid">
              <div className="form-group">
                <label>Activity Name:*</label>
                <input type="text" required />
              </div>

              <div className="form-group">
                <label>Activity Coordinator:</label>
                <select>
                  <option>Select</option>
                  <option>Faculty 1</option>
                  <option>Faculty 2</option>
                </select>
              </div>

              <div className="form-group">
                <label>Activity Category:*</label>
                <select required>
                  <option value="">Select</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Technical">Technical</option>
                </select>
              </div>

              <div className="form-group">
                <label>Date of the Event:*</label>
                <input type="date" required />
              </div>

              <div className="form-group">
                <label>Faculty Advisor:*</label>
                <input type="text" required />
              </div>

              <div className="form-group">
                <label>Points Expected:</label>
                <input type="number" />
              </div>

              <div className="form-group full-width">
                <label>Description:</label>
                <textarea />
              </div>

              {/* File Upload Section */}
              <div className="form-group full-width">
                <label>Upload Documents:*</label>
                <div className="file-upload-section">
                  <input type="file" required />
                  <button type="button" className="upload-btn">Upload</button>
                  <button type="button" className="delete-btn">Delete</button>
                  <button type="button" className="add-btn">+</button>
                </div>
              </div>
            </div>

            {/* Declaration */}
            <div className="form-checkbox">
              <input type="checkbox" required />
              <label>
                I hereby declare that all the details and documents submitted
                are true and correct to the best of my knowledge
              </label>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-btn">SUBMIT</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;
