import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import EventList from "./pages/EventList";
import RequestForm from "./pages/RequestForm";
import EventDetail from "./pages/EventDetail"; // Import the details page
import FacultyEvent from "./pages/FacultyEvent"; // Import the faculty event page
import AddEvent from "./pages/AddEvent";
import StudentProfile from "./pages/StudentProfile";
import FacultyEvents from "./pages/FacultyEvent";
import FacultyStudents from "./pages/FacultyStudents";
import FacultyEventDetails from "./pages/FacultyEventDetails";
import StudentReport from "./pages/StudentReport";
import StudentRequest from "./pages/StudentRequest";
import FacultyRequest from "./pages/FacultyRequest";
import FacultyRequestDetails from "./pages/FacultyRequestDetails";
import StudentRequestDetails from "./pages/StudentRequestDetails";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import OAuthHandler from "./pages/OAuthHandler";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/admin-login" element={<AdminLogin/>}/>
      <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
      <Route path="/login" element={<HomePage />} />
      <Route path="/oauth-success" element={<OAuthHandler />} />
      <Route path="/StudentDashboard" element={<StudentDashboard />} />
      <Route path="/FacultyDashboard" element={<FacultyDashboard />} />
      <Route path="/student/request/add" element={<RequestForm />} />
      <Route path="/student/request/edit/:requestId" element={<RequestForm />} />
      <Route path="/events" element={<EventList />} />
      <Route path="/event/:id" element={<EventDetail />} />
      <Route path="eventss" element={<FacultyEvent/>} />
      <Route path="events/add" element={<AddEvent />} />
      <Route path="/profile" element={<StudentProfile />} />
      <Route path="/FacultyEvents" element={<FacultyEvents />} />
      <Route path="/faculty/students" element={<FacultyStudents />} />
      <Route path="/faculty/event/:id" element={<FacultyEventDetails />} />
      <Route path="/student-report/:rollNumber" element={<StudentReport />} />
      <Route path="/student/request/:status/:rollnumber" element={<StudentRequest/>} />
      <Route path="/faculty/requests" element={<FacultyRequest />} />
      <Route path="/faculty/request/:id" element={<FacultyRequestDetails/>} />
      <Route path="/student/request/:id" element={<StudentRequestDetails/>} /> 
    </Routes>
  </Router>
);


export default AppRoutes;
