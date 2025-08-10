// src/components/VaultCard.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/VaultCard.css";

const VaultCard = ({ entry, index }) => {
  const navigate = useNavigate();

  // This helper function is perfect, no changes needed.
  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case "easy":
        return "easy";
      case "medium":
        return "medium";
      case "hard":
        return "hard";
      default:
        return "";
    }
  };

  // This date formatting is also great, no changes needed.
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    // Using en-GB gives DD/MM/YYYY format, which is common.
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <tr className="vaultcard-row">
      <td>{index + 1}</td>

      <td
        className="vaultcard-title"
        onClick={() => navigate(`/view/${entry._id}`)}
        style={{ cursor: "pointer" }}
      >
        {entry.title}
      </td>

      <td>
        <div className="vaultcard-tags">
          {/*
            - We simplified this part.
            - Since the data comes from our API, we know 'entry.tags' is an array of objects.
            - We can reliably access 'tag.name' for each tag.
          */}
          {entry.tags?.map((tag) => (
            <span key={tag._id} className="vaultcard-tag">
              #{tag.name}
            </span>
          ))}
        </div>
      </td>

      <td>
        <span
          className={`vaultcard-difficulty ${getDifficultyColor(
            entry.difficulty
          )}`}
        >
          {entry.difficulty}
        </span>
      </td>

      <td>{formatDate(entry.date)}</td>
    </tr>
  );
};

export default VaultCard;