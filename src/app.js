const express = require("express");
const accountRoutes = require("./routes/accountRoutes");

const app = express();

app.use(express.json());
app.use("/", accountRoutes);

module.exports = app;
