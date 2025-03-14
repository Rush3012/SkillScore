import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import EventList from "./pages/EventList";
import RequestForm from "./pages/RequestForm";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/StudentDashboard/:userId" element={<StudentDashboard />} />
      <Route path="/FacultyDashboard/:userId" element={<FacultyDashboard />} />
      <Route path="/request" element={<RequestForm />} />
      <Route path="/events" element={<EventList />} />
    </Routes>
  </Router>
);

export default AppRoutes;
