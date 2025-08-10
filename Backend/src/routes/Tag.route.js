const express = require("express");
const router = express.Router();
const tagController = require("../controllers/Tag.controller");

// Create a new tag
router.post("/", tagController.createTag);

// Get all tags
router.get("/", tagController.getTags);

// Delete a tag by ID
router.delete("/:id", tagController.deleteTag);

module.exports = router;
