import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import EventList from "./pages/EventList";
import RequestForm from "./pages/RequestForm";
import EventDetail from "./pages/EventDetail"; // Import the details page
import FacultyEvent from "./pages/FacultyEvent"; // Import the faculty event page
import AddEvent from "./pages/AddEvent";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/StudentDashboard/:userId" element={<StudentDashboard />} />
      <Route path="/FacultyDashboard/:userId" element={<FacultyDashboard />} />
      <Route path="/request" element={<RequestForm />} />
      <Route path="/events" element={<EventList />} />
      <Route path="/event/:id" element={<EventDetail />} />
      <Route path="eventss" element={<FacultyEvent/>} />
      <Route path="events/add" element={<AddEvent />} />
    </Routes>
  </Router>
);


export default AppRoutes;
