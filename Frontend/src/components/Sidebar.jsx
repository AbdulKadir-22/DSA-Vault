import { useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = ({ tags, setTags }) => {
  const navigate = useNavigate();

  const handleAddTag = () => {
    let newTag = prompt("Enter new tag (without #):");
    if (!newTag) return;
    newTag = newTag.trim();

    if (newTag === "") {
      alert("Tag cannot be empty!");
      return;
    }

    const normalized = newTag.toLowerCase();
    const tagExists = tags.some((tag) => tag.toLowerCase() === normalized);

    if (tagExists) {
      alert("Tag already exists!");
      return;
    }

    setTags([...tags, newTag]);
  };

  return (
    <aside className="sidebar">
      <h1 className="sidebar-title">DSA Vault</h1>

      <button className="sidebar-button" onClick={() => navigate("/add")}>
        ➕ Add New
      </button>

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
          {tags.map((tag, idx) => (
            <li className="tag-item" key={idx}>
              #{tag}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
