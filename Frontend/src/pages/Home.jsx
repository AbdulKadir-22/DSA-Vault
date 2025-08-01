import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import VaultTable from "../components/VaultTable";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [vaultEntries, setVaultEntries] = useState([]);
  const [tags, setTags] = useState([
    "Array", "Greedy", "HashMap", "DP", "Sorting", "Two Pointers"
  ]);

  // Load default mock data only once
  useEffect(() => {
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

  // Handle new entry passed via navigation state (Fix #2)
  useEffect(() => {
    const newEntry = location.state?.newEntry;

    if (newEntry) {
      const finalEntry = {
        ...newEntry,
        _id: newEntry._id || Date.now().toString(), // add unique ID if missing
        date: newEntry.date || new Date().toISOString().split("T")[0], // format YYYY-MM-DD
      };

      setVaultEntries(prev => {
        const isDuplicate = prev.some(entry => entry._id === finalEntry._id);
        if (isDuplicate) return prev;
        return [...prev, finalEntry];
      });

      // Add any new tags to global tags list
      const newTags = finalEntry.tags.filter(tag => !tags.includes(tag));
      if (newTags.length > 0) {
        setTags(prev => [...prev, ...newTags]);
      }

      navigate(location.pathname, { replace: true }); // clear state
    }
  }, [location, navigate, tags]);

  // Filter logic
  const filteredEntries = vaultEntries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every(tag => entry.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  return (
    <div className="home-container">
      <Sidebar tags={tags} setTags={setTags} />
      <main className="home-main">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <FilterBar
          tags={tags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
        <VaultTable entries={filteredEntries} />
      </main>
    </div>
  );
};

export default Home;
