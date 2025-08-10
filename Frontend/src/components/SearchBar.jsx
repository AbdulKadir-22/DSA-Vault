
import "../styles/SearchBar.css";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="searchbar-container">
      <input
        type="text"
        placeholder=" Search by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="searchbar-input"
      />
    </div>
  );
};

export default SearchBar;
