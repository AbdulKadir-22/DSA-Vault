// src/pages/Home.js

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import '../styles/Home.css'

import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import VaultTable from "../components/VaultTable";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // --- CENTRALIZED STATE ---
  // All application state now lives in the Home component.
  const [problems, setProblems] = useState([]); // Will hold problems from API
  const [tags, setTags] = useState([]); // Will hold tags from API
  const [loading, setLoading] = useState(true); // Single loading state for the page

  // State for filtering and searching
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  // --- DATA FETCHING ---
  // A single useEffect to fetch all initial data.
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        // Fetch problems and tags in parallel for efficiency
        const problemsResponse = await axios.get("http://localhost:5000/api/problems");
        const tagsResponse = await axios.get("http://localhost:5000/api/tags");

        setProblems(problemsResponse.data);
        setTags(tagsResponse.data);

      } catch (err) {
        console.error("Error fetching data:", err);
        // You could add state here to show an error message in the UI
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // --- LOGIC TO HANDLE NEWLY ADDED ENTRIES ---
  // This logic is good, but now it updates the centralized 'problems' state.
  useEffect(() => {
    const newEntry = location.state?.newEntry;
    if (newEntry) {
      setProblems(prev => [newEntry, ...prev]); // Add new problem to the top of the list
      // Clear the state from navigation to prevent re-adding on refresh
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  // --- HANDLER FUNCTIONS TO PASS TO CHILDREN ---
  // This function will be passed to the Sidebar to handle adding a new tag.
  const handleAddTag = useCallback(async (tagName) => {
    try {
      const res = await axios.post("http://localhost:5000/api/tags", { name: tagName });
      // Add the new tag returned from the backend to our state
      setTags(prevTags => [...prevTags, res.data]);
    } catch (err) {
      console.error("Error adding tag:", err);
      alert("Failed to add new tag."); // Inform the user
    }
  }, []); // useCallback ensures this function doesn't get recreated on every render

  // --- FILTERING LOGIC ---
  // This remains the same, but now it correctly filters the 'problems' state fetched from the API.
  const filteredProblems = problems.filter(entry => {
    // Search query check
    const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase());

    // Tag check
    const entryTagNames = entry.tags.map(tag => tag.name);
    const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => entryTagNames.includes(tag));

    return matchesSearch && matchesTags;
  });

  return (
    <div className="home-container">
      {/* Sidebar now receives tags and the function to add a new tag */}
      <Sidebar tags={tags} onAddTag={handleAddTag} />

      <main className="home-main">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* FilterBar receives tags from state and functions to update the selected tags */}
        <FilterBar
          tags={tags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />

        {/* VaultTable now receives the final, filtered list of problems and the loading state */}
        <VaultTable entries={filteredProblems} loading={loading} />
      </main>
    </div>
  );
};

export default Home;