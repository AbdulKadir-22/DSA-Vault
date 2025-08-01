import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Form from "./pages/Form";

const App = () => {
  const [problems, setProblems] = useState([]);

  const handleSubmitProblem = (newProblem) => {
    setProblems((prev) => [...prev, newProblem]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home problems={problems} />} />
        <Route path="/add" element={<Form onSubmitProblem={handleSubmitProblem} />} />
      </Routes>
    </Router>
  );
};

export default App;
