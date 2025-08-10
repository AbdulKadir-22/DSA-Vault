const problemService = require("../services/Problem.service");

// Create a new problem
const createProblem = async (req, res) => {
  try {
    const data = req.body;
    const problem = await problemService.createProblem(data);
    res.status(201).json(problem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all problems
const getProblems = async (req, res) => {
  try {
    // If filtering by tags
    if (req.query.tags) {
      const tagIds = req.query.tags.split(",");
      const problems = await problemService.getProblemsByTags(tagIds);
      return res.json(problems);
    }

    // Else get all problems
    const problems = await problemService.getAllProblems();
    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get Problem by id 
const getProblemById = async (req, res) => {
  try {
    const problem = await problemService.getProblemById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.status(200).json(problem);
  } catch (error) {
    res.status(500).json({ message: "Error fetching problem", error });
  }
};

// Update a problem
const updateProblem = async (req, res) => {
  try {
    const problem = await problemService.updateProblem(req.params.id, req.body);

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    res.json(problem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a problem
const deleteProblem = async (req, res) => {
  try {
    const problem = await problemService.deleteProblem(req.params.id);

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    res.json({ message: "Problem deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProblem,
  getProblems,
  getProblemById,
  updateProblem,
  deleteProblem
};
