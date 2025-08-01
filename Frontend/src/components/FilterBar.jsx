import React from "react";
import "../styles/FilterBar.css";

const ALL_TAGS = ["Array", "DP", "HashMap", "Greedy", "Sorting", "Two Pointers"];

const FilterBar = ({ selectedTags, setSelectedTags }) => {
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="filterbar-container">
      {ALL_TAGS.map((tag) => (
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
