
import VaultCard from "./VaultCard";
import "../styles/VaultTable.css";

const VaultTable = ({ entries }) => {
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
          {entries.length > 0 ? (
            entries.map((entry, index) => (
              <VaultCard key={entry._id} entry={entry} index={index} />
            ))
          ) : (
            <tr>
              <td colSpan="5" className="vaulttable-empty">
                No entries found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VaultTable;
