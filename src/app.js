const express = require("express");
const app = express(); 

app.use(express.json());

let accounts = {};
let events = [];

app.post("/reset", (req, res) => {
  accounts = {};
  events = [];
  res.status(200).send("OK");
});

module.exports = { app };
