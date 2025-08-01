// src/pages/Form.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import "../styles/Form.css";

const Form = ({ onSubmitProblem }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    platform: "",
    url: "",
    solution: "",
    language: "",
    tags: "",
    difficulty: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const entry = {
      ...formData,
      _id: Date.now().toString(), // Temporary unique ID
      tags: formData.tags.split(",").map(tag => tag.trim()),
    };

    // Send data to parent / context / server
    onSubmitProblem(entry);

    // Navigate to homepage with new entry
    navigate("/", {
      state: { newEntry: entry },
    });

    // Reset form
    setFormData({
      title: "",
      platform: "",
      url: "",
      solution: "",
      language: "",
      tags: "",
      difficulty: "",
      date: "",
    });
  };

  return (
    <div className="form-container">
      <h2>Add New DSA Problem</h2>
      <form onSubmit={handleSubmit}>
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
          placeholder="e.g., LeetCode"
        />
        <InputField
          label="Problem URL"
          name="url"
          value={formData.url}
          onChange={handleChange}
          type="url"
        />
        <div className="input-field">
          <label htmlFor="solution">Solution Code</label>
          <textarea
            id="solution"
            name="solution"
            value={formData.solution}
            onChange={handleChange}
            placeholder="Paste your code here"
            rows="22"
            required
          ></textarea>
        </div>
        <InputField
          label="Language"
          name="language"
          value={formData.language}
          onChange={handleChange}
          placeholder="e.g., Java"
        />
        <InputField
          label="Tags (comma separated)"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
        />
        <InputField
          label="Difficulty"
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          placeholder="Easy / Medium / Hard"
        />
        <InputField
          label="Date Solved"
          name="date"
          value={formData.date}
          onChange={handleChange}
          type="date"
        />

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
