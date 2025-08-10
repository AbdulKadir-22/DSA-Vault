const tagService = require("../services/Tag.service");

// Create a new tag
const createTag = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Tag name is required" });
    }

    const tag = await tagService.createTag(name);
    res.status(201).json(tag);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all tags
const getTags = async (req, res) => {
  try {
    const tags = await tagService.getAllTags();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a tag
const deleteTag = async (req, res) => {
  try {
    const tag = await tagService.deleteTag(req.params.id);

    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    res.json({ message: "Tag deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTag,
  getTags,
  deleteTag
};
