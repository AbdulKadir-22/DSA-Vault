const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

const tagRoutes = require("./routes/Tag.route");
const problemRoutes = require("./routes/Problem.route");

app.use("/api/tags", tagRoutes);
app.use("/api/problems", problemRoutes);

// Error handling
app.use(errorHandler);

module.exports = app;