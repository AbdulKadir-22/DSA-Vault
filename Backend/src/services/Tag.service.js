const Tag = require("../models/Tag.model");

// Create new tag
const createTag = async (name) => {
  return await Tag.create({ name });
};

// Get all tags
const getAllTags = async () => {
  return await Tag.find().sort({ name: 1 }); // sorted alphabetically
};

// Find tag by ID
const getTagById = async (id) => {
  return await Tag.findById(id);
};

// Delete tag
const deleteTag = async (id) => {
  return await Tag.findByIdAndDelete(id);
};

module.exports = {
  createTag,
  getAllTags,
  getTagById,
  deleteTag
};
