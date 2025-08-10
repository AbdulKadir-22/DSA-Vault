const express = require("express");
const router = express.Router();
const problemController = require("../controllers/Problem.controller");

// Create a new problem
router.post("/", problemController.createProblem);

// Get all problems (or filter by tags via query params)
router.get("/", problemController.getProblems);

//get problem by id
router.get("/:id", problemController.getProblemById);

// Update a problem by ID
router.put("/:id", problemController.updateProblem);

// Delete a problem by ID
router.delete("/:id", problemController.deleteProblem);

module.exports = router;
