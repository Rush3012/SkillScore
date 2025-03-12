import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
//import RequestPage from "./pages/RequestPage";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/StudentDashboard" element={<StudentDashboard />} />
      <Route path="/FacultyDashboard" element={<FacultyDashboard />} />
    </Routes>
  </Router>
);

export default AppRoutes;
