const express = require("express");
const router = express.Router();
const vaultController = require("../controllers/vault.controller");


router.get("/", vaultController.getAllVaults);  //Get all vault entries
router.post("/", vaultController.createVault);  //Create a new vault entry
router.get("/:id", vaultController.getVaultById);  //Get a vault entry by ID
router.put("/:id", vaultController.updateVault);  //Update a vault entry by ID
router.delete("/:id", vaultController.deleteVault);  //Delete a vault entry by ID

module.exports = router;
