const Problem = require("../models/Problems.model");

// Create new problem
const createProblem = async (data) => {
  return await Problem.create(data);
};

// Get all problems (with tag details)
const getAllProblems = async () => {
  return await Problem.find()
    .populate("tags", "name") // populate only tag names
    .sort({ createdAt: -1 }); // newest first
};

// Get filtered problems by tag IDs
const getProblemsByTags = async (tagIds) => {
  return await Problem.find({ tags: { $in: tagIds } })
    .populate("tags", "name")
    .sort({ createdAt: -1 });
};

const getProblemById = async (id) => {
  return await Problem.findById(id).populate("tags");
};

// Update problem
const updateProblem = async (id, data) => {
  return await Problem.findByIdAndUpdate(id, data, { new: true });
};

// Delete problem
const deleteProblem = async (id) => {
  return await Problem.findByIdAndDelete(id);
};

module.exports = {
  createProblem,
  getAllProblems,
  getProblemsByTags,
  getProblemById,
  updateProblem,
  deleteProblem
};
