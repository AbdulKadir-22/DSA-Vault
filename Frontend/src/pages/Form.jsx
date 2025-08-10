// src/pages/Form.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputField from "../components/InputField";
import "../styles/Form.css"; // We'll assume this file styles our form

const Form = () => {
  const navigate = useNavigate();

  // State to hold all available tags fetched from the API
  const [allTags, setAllTags] = useState([]);
  
  // Prefill date with today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    title: "",
    platform: "LeetCode", // Default value
    url: "",
    solution: "",
    language: "Java", // Default value
    difficulty: "Medium", // Default value
    date: today,
    tags: [], // Will now be an array of tag IDs
  });

  // Fetch all tags when the component mounts
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tags");
        setAllTags(res.data);
      } catch (err) {
        console.error("Failed to fetch tags:", err);
      }
    };
    fetchTags();
  }, []);

  // A more robust handleChange that can handle the multi-select tags
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "select-multiple") {
      const options = Array.from(e.target.selectedOptions, (option) => option.value);
      setFormData((prev) => ({ ...prev, [name]: options }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the structured form data to the backend
      const res = await axios.post("http://localhost:5000/api/problems", formData);
      
      // The backend returns the complete new problem object
      const newProblem = res.data;
      
      // Navigate to the homepage and pass the new entry so the list updates instantly
      navigate("/", { state: { newEntry: newProblem } });

    } catch (err) {
      console.error("Error creating problem:", err);
      alert("Failed to create problem. Check the console for details.");
    }
  };

  return (
    <div className="form-container">
      <h2>Add New DSA Problem</h2>
      <form onSubmit={handleSubmit} className="problem-form">
        <InputField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <InputField
          label="Platform"
          name="platform"
          value={formData.platform}
          onChange={handleChange}
        />
        <InputField
          label="Problem URL"
          name="url"
          value={formData.url}
          onChange={handleChange}
          type="url"
        />

        {/* Difficulty Dropdown */}
        <div className="input-field">
          <label htmlFor="difficulty">Difficulty</label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            required
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <InputField
          label="Language"
          name="language"
          value={formData.language}
          onChange={handleChange}
        />

        {/* Tags Multi-Select Dropdown */}
        <div className="input-field">
          <label htmlFor="tags">Tags (Ctrl/Cmd + Click to select multiple)</label>
          <select
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            multiple={true}
            size="5" // Shows 5 tags at a time
          >
            {allTags.map((tag) => (
              <option key={tag._id} value={tag._id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>
        
        <InputField
          label="Date Solved"
          name="date"
          value={formData.date}
          onChange={handleChange}
          type="date"
          required
        />

        <div className="input-field full-width">
          <label htmlFor="solution">Solution Code</label>
          <textarea
            id="solution"
            name="solution"
            value={formData.solution}
            onChange={handleChange}
            placeholder="Paste your code here"
            rows="15"
            required
          ></textarea>
        </div>

        <button type="submit" className="submit-btn full-width">
          Add Problem to Vault
        </button>
      </form>
    </div>
  );
};

export default Form;