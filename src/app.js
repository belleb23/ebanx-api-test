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

app.post("/event", (req, res) => {
    const { type, amount, origin, destination } = req.body;

    if (type && amount !== undefined) {
        if (type === "deposit") {
            
            if (!destination) {
                return res.status(400).send("Destination account is required for deposit");
            }

            if (!accounts[destination]) {
                accounts[destination] = 0;
            }

            accounts[destination] += amount;
            events.push({ type, amount, destination });

            return res.status(201).json({
                destination: {
                    id: destination,
                    balance: accounts[destination]
                }
            });
        } else {
            return res.status(400).send("Invalid event type");
        }
    } else {
        return res.status(400).send("Invalid request body");
    }
});

app.get("/balance", (req, res) => {
    const { account_id } = req.query;

    if (!account_id) {
        return res.status(400).send("Account ID is required");
    }

    if (accounts[account_id] !== undefined) {
        res.status(200).send(accounts[account_id].toString());
    } else {
        res.status(404).send("0");
    }
});

module.exports = { app };
