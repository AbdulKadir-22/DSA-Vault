const Vault = require("../models/vault.model");

// GET /api/vault
exports.getAllVaults = async (req, res) => {
  try {
    const vaults = await Vault.find().sort({ createdAt: -1 });
    res.status(200).json(vaults);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch vault entries." });
  }
};

// POST /api/vault
exports.createVault = async (req, res) => {
  try {
    const newEntry = await Vault.create(req.body);
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(400).json({ error: "Failed to create entry." });
  }
};


// GET /api/vault/:id
exports.getVaultById = async (req, res) => {
  try {
    const vault = await Vault.findById(req.params.id);
    if (!vault) return res.status(404).json({ error: "Entry not found." });
    res.status(200).json(vault);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch entry." });
  }
};


// PUT /api/vault/:id
exports.updateVault = async (req, res) => {
  try {
    const updatedVault = await Vault.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedVault)
      return res.status(404).json({ error: "Entry not found." });

    res.status(200).json(updatedVault);
  } catch (err) {
    res.status(400).json({ error: "Failed to update entry." });
  }
};


// DELETE /api/vault/:id
exports.deleteVault = async (req, res) => {
  try {
    const deletedVault = await Vault.findByIdAndDelete(req.params.id);
    if (!deletedVault)
      return res.status(404).json({ error: "Entry not found." });

    res.status(200).json({ message: "Entry deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete entry." });
  }
};
