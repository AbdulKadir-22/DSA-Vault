// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Form from "./pages/Form";
import ProblemDetailsPage from "./pages/ProblemDetails"; // Import the new details page

// The App component is now stateless. Its only responsibility is routing.
const App = () => {
  return (
    <Router>
      {/* A main container div can be useful for global styling */}
      <div className="app-container">
        <Routes>
          {/* Route for the main page */}
          <Route path="/" element={<Home />} />

          {/* Route for the "Add New Problem" form */}
          <Route path="/add" element={<Form />} />

          {/* Route for viewing and editing a specific problem */}
          <Route path="/view/:id" element={<ProblemDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;