import React from "react";
import AppRoutes from "./routes"; // Import Routes

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <AppRoutes /> {/* Manages navigation between pages */}
    </div>
  );
}

export default App;
