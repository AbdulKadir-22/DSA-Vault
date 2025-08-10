import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import InputField from "../components/InputField";
import "../styles/Form.css"; // Reuse the same form styling

const ProblemDetailsPage = () => {
  const { id } = useParams(); // Get the problem ID from the URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null); // Use null to indicate not yet loaded
  const [allTags, setAllTags] = useState([]); // To populate the tags dropdown
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both the specific problem and the list of all tags in parallel
        const [problemRes, tagsRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/problems/${id}`),
          axios.get("http://localhost:5000/api/tags"),
        ]);

        const problemData = problemRes.data;
        // The form select needs an array of tag IDs, so we extract them.
        problemData.tags = problemData.tags.map(tag => tag._id);
        // The date needs to be in YYYY-MM-DD format for the input field.
        problemData.date = new Date(problemData.date).toISOString().split("T")[0];

        setFormData(problemData);
        setAllTags(tagsRes.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Could not load problem details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // Re-run this effect if the ID in the URL changes

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "select-multiple") {
      const options = Array.from(e.target.selectedOptions, (option) => option.value);
      setFormData((prev) => ({ ...prev, [name]: options }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/problems/${id}`, formData);
      alert("Problem updated successfully!");
      navigate("/"); // Go back to the homepage
    } catch (err) {
      console.error("Error updating problem:", err);
      alert("Failed to update problem.");
    }
  };

  const handleDelete = async () => {
    // Ask for confirmation before deleting
    if (window.confirm("Are you sure you want to delete this problem?")) {
      try {
        await axios.delete(`http://localhost:5000/api/problems/${id}`);
        alert("Problem deleted successfully.");
        navigate("/");
      } catch (err) {
        console.error("Error deleting problem:", err);
        alert("Failed to delete problem.");
      }
    }
  };

  // Conditional Rendering based on state
  if (loading) return <p className="form-container">Loading problem...</p>;
  if (error) return <p className="form-container error-message">{error}</p>;
  if (!formData) return null; // Or some other fallback UI

  return (
    <div className="form-container">
      <h2>Edit DSA Problem</h2>
      <form onSubmit={handleUpdate} className="problem-form">
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

        <div className="input-field">
          <label htmlFor="tags">Tags (Ctrl/Cmd + Click to select multiple)</label>
          <select
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            multiple={true}
            size="5"
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
            rows="15"
            required
          ></textarea>
        </div>
        
        <div className="form-actions">
          <button type="button" onClick={handleDelete} className="delete-btn">
            Delete Problem
          </button>
          <button type="submit" className="submit-btn">
            Update Problem
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProblemDetailsPage;