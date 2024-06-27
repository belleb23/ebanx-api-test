// accountRoutes
const express = require("express");
const { resetHandler, eventHandler, balanceHandler } = require("../controllers/accountController");

const router = express.Router();

router.post("/reset", resetHandler);
router.post("/event", eventHandler);
router.get("/balance", balanceHandler);

module.exports = router;
