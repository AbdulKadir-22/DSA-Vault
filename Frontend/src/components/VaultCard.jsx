import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/VaultCard.css";

const VaultCard = ({ entry, index }) => {
  const navigate = useNavigate();

  const getDifficultyColor = (level) => {
    switch (level.toLowerCase()) {
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

  return (
    <tr className="vaultcard-row">
      <td>{index + 1}</td>
      <td
        className="vaultcard-title"
        onClick={() => navigate(`/view/${entry._id}`)}
      >
        {entry.title}
      </td>
      <td>
        <div className="vaultcard-tags">
          {entry.tags.map((tag, i) => (
            <span key={i} className="vaultcard-tag">
              #{tag}
            </span>
          ))}
        </div>
      </td>
      <td>
        <span className={`vaultcard-difficulty ${getDifficultyColor(entry.difficulty)}`}>
          {entry.difficulty}
        </span>
      </td>
      <td>{entry.date}</td>
    </tr>
  );
};

export default VaultCard;
