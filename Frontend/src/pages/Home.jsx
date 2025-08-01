import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import VaultTable from "../components/VaultTable";

// import "../styles/Home.css"; // Optional

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [vaultEntries, setVaultEntries] = useState([]);

  useEffect(() => {
    // Temp: mock data
    const mock = [
      {
        _id: "1",
        title: "Two Sum",
        tags: ["Array", "HashMap"],
        difficulty: "Easy",
        date: "2025-08-01",
      },
      {
        _id: "2",
        title: "Longest Substring Without Repeating Characters",
        tags: ["String", "Sliding Window"],
        difficulty: "Medium",
        date: "2025-08-01",
      },
    ];
    setVaultEntries(mock);
  }, []);

  const filteredEntries = vaultEntries.filter((entry) => {
    const matchesSearch = entry.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => entry.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  return (
    <div className="home-container">
      <Sidebar />
      <main className="home-main">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <FilterBar
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
        <VaultTable entries={filteredEntries} />
      </main>
    </div>
  );
};

export default Home;
