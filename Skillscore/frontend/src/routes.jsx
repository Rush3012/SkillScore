import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import Users from "./pages/Users";  // Import Users page

//import RequestPage from "./pages/RequestPage";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/StudentDashboard/:userId" element={<StudentDashboard />} />
      <Route path="/FacultyDashboard/:userId" element={<FacultyDashboard />} />
      <Route path="/users" element={<Users />} />  {/* Add Users Route */}
    </Routes>
  </Router>
);

export default AppRoutes;
