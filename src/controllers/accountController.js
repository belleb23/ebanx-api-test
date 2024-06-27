const { resetAccounts, handleEvent, getBalance } = require("../services/accountService");

// Controller function for resetting accounts
const resetHandler = (req, res) => {
    try {
        const result = resetAccounts();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Controller function for handling events
const eventHandler = (req, res) => {
    try {
        const result = handleEvent(req.body);
        res.status(201).json(result);
    } catch (error) {
        if (error.message === "0") {
            res.status(404).send(error.message);
        } else if (error.message === "Invalid request body" || error.message === "Invalid event type" || error.message.includes("is required")) {
            res.status(400).send(error.message);
        } else {
            res.status(500).send(error.message);
        }
    }
};

// Controller function for retrieving account balance
const balanceHandler = (req, res) => {
    try {
        const balance = getBalance(req.query.account_id);
        res.status(200).send(balance);
    } catch (error) {
        if (error.message === "0") {
            res.status(404).send(error.message);
        } else {
            res.status(400).send(error.message);
        }
    }
};

module.exports = {
    resetHandler,
    eventHandler,
    balanceHandler
};
