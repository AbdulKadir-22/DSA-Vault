
import { useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <h1 className="sidebar-title">DSA Vault</h1>

      <button className="sidebar-button" onClick={() => navigate("/add")}>
        ➕ Add New
      </button>

      <div className="sidebar-stats">
        <p>🔥 Streak: <strong>3 days</strong></p>
        <p>📚 Total: <strong>45 problems</strong></p>
      </div>

      <div className="sidebar-tags">
        <p className="sidebar-subtitle">Tags</p>
        <ul>
          <li>#Array</li>
          <li>#Greedy</li>
          <li>#HashMap</li>
          <li>#DP</li>
          {/* Future: make dynamic or clickable */}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
