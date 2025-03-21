// import React, { useState, useEffect } from "react";
// import { Tabs, Tab, Table, Spinner } from "react-bootstrap";

// const StudentRequests = () => {
//     const [activeTab, setActiveTab] = useState("PENDING");
//     const [requests, setRequests] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [student, setStudent] = useState("Student");

//     // Function to fetch requests based on the selected status
//     const fetchRequests = async (status) => {
//         setLoading(true);
//         try {
//             // Fetch user profile first to get rollNumber
//             const userResponse = await fetch("http://localhost:8080/api/auth/profile", {
//                 credentials: "include",
//             });
    
//             if (!userResponse.ok) {
//                 throw new Error("Failed to fetch user data");
//             }
    
//             const userData = await userResponse.json();
//             const userId = userData.userId;

//             const studentResponse = await fetch(`http://localhost:8080/api/students/by-user/${userId}`, {
//                 credentials: "include",
//             });
            
//             if (!studentResponse.ok) {
//                 throw new Error("Failed to fetch student data");
//             }
    
//             const studentData = await studentResponse.json();
//             setStudent(studentData || "Student");
            
//             const rollNumber = studentData.rollNumber;
        
//             // Fetch student requests using rollNumber and status
//             const response = await fetch(`http://localhost:8080/api/requests?status=${status}&rollNumber=${rollNumber}`);
            
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
            
//             const data = await response.json();
//             setRequests(data);
//         } catch (error) {
//             console.error("Error fetching requests:", error);
//             setRequests([]);
//         }
//         setLoading(false);
//     };
    
//     // Fetch requests whenever activeTab changes
//     useEffect(() => {
//         fetchRequests(activeTab);
//     }, [activeTab]);

//     return (
//         <div className="container mt-4">
//             <h2>My Requests ({student.name})</h2>
//             <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
//                 <Tab eventKey="PENDING" title="Pending">
//                     {loading ? <Spinner animation="border" /> : <RequestTable requests={requests} />}
//                 </Tab>
//                 <Tab eventKey="ACCEPTED" title="Accepted">
//                     {loading ? <Spinner animation="border" /> : <RequestTable requests={requests} />}
//                 </Tab>
//                 <Tab eventKey="REJECTED" title="Rejected">
//                     {loading ? <Spinner animation="border" /> : <RequestTable requests={requests} />}
//                 </Tab>
//             </Tabs>
//         </div>
//     );
// };

// // Component to display requests in a table format
// const RequestTable = ({ requests }) => (
//     <Table striped bordered hover>
//         <thead>
//             <tr>
//                 <th>#</th>
//                 <th>Title</th>
//                 <th>Description</th>
//             </tr>
//         </thead>
//         <tbody>
//             {requests.length === 0 ? (
//                 <tr><td colSpan="3" className="text-center">No requests found.</td></tr>
//             ) : (
//                 requests.map((req, index) => (
//                     <tr key={req.id}>
//                         <td>{index + 1}</td>
//                         <td>{req.title}</td>
//                         <td>{req.description}</td>
//                     </tr>
//                 ))
//             )}
//         </tbody>
//     </Table>
// );

// export default StudentRequests;


import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./StudentRequest.css";
import Header from "../components/stu_header";
import Sidebar from "../components/stu_sidebar";
import { Spinner } from "react-bootstrap";

const StudentRequests = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("PENDING");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState({ rollNumber: "Student" });

  // Function to fetch requests
  const fetchRequests = async (status, rollNumber) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/requests/${status}/${rollNumber}`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching requests:", error);
      setRequests([]);
    }
    setLoading(false);
  };

  // Fetch student details on mount
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const userResponse = await fetch("http://localhost:8080/api/auth/profile", { credentials: "include" });
        if (!userResponse.ok) throw new Error("Failed to fetch user data");
        const userData = await userResponse.json();

        const studentResponse = await fetch(`http://localhost:8080/api/students/by-user/${userData.userId}`, { credentials: "include" });
        if (!studentResponse.ok) throw new Error("Failed to fetch student data");
        
        const studentData = await studentResponse.json();
        setStudent(studentData);

        // Extract status and rollNumber from URL
        const pathParts = location.pathname.split("/");
        const statusFromURL = pathParts[3];
        const rollNumberFromURL = studentData.rollNumber;

        if (statusFromURL) {
          setActiveTab(statusFromURL);
          fetchRequests(statusFromURL, rollNumberFromURL);
        } else {
          navigate(`/student/request/PENDING/${rollNumberFromURL}`);
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchStudentData();
  }, []);

  // Update requests when URL changes
  useEffect(() => {
    const pathParts = location.pathname.split("/");
    const statusFromURL = pathParts[3];
    const rollNumberFromURL = pathParts[4];

    if (statusFromURL && rollNumberFromURL) {
      setActiveTab(statusFromURL);
      fetchRequests(statusFromURL, rollNumberFromURL);
    }
  }, [location.pathname]);

  return (
    <div className="dashboard-container">
      <Sidebar role="STUDENT" />

      <main className="dashboard-main-content">
        <Header />

        <div className="requests-container">
          <h2>My Requests</h2>

          <div className="tabs">
            <button 
              className={activeTab === "PENDING" ? "active" : ""} 
              onClick={() => navigate(`/student/request/PENDING/${student.rollNumber}`)}>
              Pending
            </button>
            <button 
              className={activeTab === "REJECTED" ? "active" : ""} 
              onClick={() => navigate(`/student/request/REJECTED/${student.rollNumber}`)}>
              Rejected
            </button>
            <button 
              className={activeTab === "APPROVED" ? "active" : ""} 
              onClick={() => navigate(`/student/request/APPROVED/${student.rollNumber}`)}>
              Approved
            </button>
          </div>

          {loading ? (
            <Spinner animation="border" />
          ) : (
            <div className="request-list">
              {requests.length === 0 ? (
                <p className="text-center">No requests found.</p>
              ) : (
                requests.map((request) => (
                  <div key={request.id} className="request-card">
                    <h3>{request.activityName}</h3>
                    {activeTab !== "APPROVED" && <button className="edit-button">EDIT</button>}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentRequests;
