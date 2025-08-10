// src/components/FilterBar.jsx

import React from "react";
import "../styles/FilterBar.css";

// This component was already perfect. It's a pure presentational component.
const FilterBar = ({ tags, selectedTags, setSelectedTags }) => {
  const toggleTag = (tagName) => {
    if (selectedTags.includes(tagName)) {
      setSelectedTags(selectedTags.filter((t) => t !== tagName));
    } else {
      setSelectedTags([...selectedTags, tagName]);
    }
  };

  return (
    <div className="filterbar-container">
      {/* It maps over the tags it receives as a prop. */}
      {tags.map((tag) => (
        <button
          key={tag._id} // Using the unique ID from the database is great.
          onClick={() => toggleTag(tag.name)}
          className={`filter-tag ${
            selectedTags.includes(tag.name) ? "active" : ""
          }`}
        >
          #{tag.name}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;