// src/components/VaultTable.jsx

import React from "react";
import VaultCard from "./VaultCard";
import "../styles/VaultTable.css";

// This is now a pure presentational component.
// It only knows how to display the data it's given.
const VaultTable = ({ entries, loading }) => {

  // It uses the 'loading' prop from Home to show a loading message.
  if (loading) {
    return (
      <div className="vaulttable-wrapper">
        <p className="vaulttable-loading">Loading problems...</p>
      </div>
    );
  }

  return (
    <div className="vaulttable-wrapper">
      <table className="vaulttable">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Tags</th>
            <th>Difficulty</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {/* It checks if the 'entries' prop has items. */}
          {entries.length > 0 ? (
            // It maps over the 'entries' prop to render a VaultCard for each item.
            entries.map((entry, index) => (
              <VaultCard key={entry._id} entry={entry} index={index} />
            ))
          ) : (
            // If there are no entries, it shows a message.
            <tr>
              <td colSpan="5" className="vaulttable-empty">
                No entries found. Try adjusting your search or filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VaultTable;