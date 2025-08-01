import React from "react";
import "../styles/FilterBar.css";

const FilterBar = ({ tags, selectedTags, setSelectedTags }) => {
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="filterbar-container">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => toggleTag(tag)}
          className={`filter-tag ${selectedTags.includes(tag) ? "active" : ""}`}
        >
          #{tag}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
