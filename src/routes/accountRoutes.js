const express = require("express");
const { resetHandler, eventHandler, balanceHandler } = require("../controllers/accountController");

const router = express.Router();

// Routes for handling requests 
router.post("/reset", resetHandler);
router.post("/event", eventHandler);
router.get("/balance", balanceHandler);

module.exports = router;
