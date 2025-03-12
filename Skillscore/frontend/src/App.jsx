import HomePage from "./pages/HomePage"; // Import Home Page
import AppRoutes from "./routes";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <AppRoutes /> {/* Manages navigation between pages */}
    </div>
  );
}

export default App;
