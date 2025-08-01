const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

const vaultRoutes = require("./routes/vault.routes");
app.use("/vault", vaultRoutes);

// Error handling
app.use(errorHandler);

module.exports = app;