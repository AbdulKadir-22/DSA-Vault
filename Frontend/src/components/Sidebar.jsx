// src/components/Sidebar.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";

// The Sidebar is now a "dumb" component.
// It receives all the data and functions it needs as props.
const Sidebar = ({ tags, onAddTag }) => {
  const navigate = useNavigate();

  // This function is now much simpler.
  // It gets the new tag name from the user and then calls the 'onAddTag' function
  // that was passed down from the Home component.
  const handleAddTag = () => {
    const newTagName = prompt("Enter new tag name:");
    
    // Basic validation: ensure the tag isn't empty or just spaces.
    if (newTagName && newTagName.trim() !== "") {
      onAddTag(newTagName.trim());
    }
  };

  return (
    <aside className="sidebar">
      <h1 className="sidebar-title">DSA Vault</h1>

      <button className="sidebar-button" onClick={() => navigate("/add")}>
        ➕ Add New
      </button>

      {/* This section can be updated later with real data */}
      <div className="sidebar-stats">
        <p>
          🔥 Streak: <strong>3 days</strong>
        </p>
        <p>
          📚 Total: <strong>45 problems</strong>
        </p>
      </div>

      <div className="sidebar-tags">
        <div className="tag-header">
          <p className="sidebar-subtitle">Tags</p>
          <button onClick={handleAddTag} className="add-tag-btn">
            + New
          </button>
        </div>

        <ul className="tag-list">
          {/* It maps over the 'tags' prop to display the list. */}
          {tags.map((tag) => (
            <li className="tag-item" key={tag._id}>
              #{tag.name}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;