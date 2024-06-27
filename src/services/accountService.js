//accountService
let accounts = {};
let events = [];

const resetAccounts = () => {
    accounts = {};
    events = [];
    return "OK";
};

const handleEvent = ({ type, amount, origin, destination }) => {
    if (type && amount !== undefined) {
        if (type === "deposit") {
            if (!destination) {
                throw new Error("Destination account is required for deposit");
            }

            if (!accounts[destination]) {
                accounts[destination] = 0;
            }

            accounts[destination] += amount;
            events.push({ type, amount, destination });

            return {
                destination: {
                    id: destination,
                    balance: accounts[destination]
                }
            };

        } else if (type === "withdraw") {
            if (!origin) {
                throw new Error("Origin account is required for withdraw");
            }

            if (!accounts[origin]) {
                throw new Error("0");
            }

            if (accounts[origin] >= amount) {
                accounts[origin] -= amount;
                events.push({ type, amount, origin });

                return {
                    origin: {
                        id: origin,
                        balance: accounts[origin]
                    }
                };
            } else {
                throw new Error("0");
            }

        } else if (type === "transfer") {
            if (!origin || !destination) {
                throw new Error("Origin and destination accounts are required for transfer");
            }

            if (!accounts[origin]) {
                throw new Error("0");
            }

            if (!accounts[destination]) {
                accounts[destination] = 0;
            }

            if (accounts[origin] >= amount) {
                accounts[origin] -= amount;
                accounts[destination] += amount;
                events.push({ type, amount, origin, destination });

                return {
                    origin: {
                        id: origin,
                        balance: accounts[origin]
                    },
                    destination: {
                        id: destination,
                        balance: accounts[destination]
                    }
                };
            } else {
                throw new Error("0");
            }
        } else {
            throw new Error("Invalid event type");
        }
    } else {
        throw new Error("Invalid request body");
    }
};

const getBalance = (accountId) => {
    if (!accountId) {
        throw new Error("Account ID is required");
    }

    if (accounts[accountId] !== undefined) {
        return accounts[accountId].toString();
    } else {
        throw new Error("0");
    }
};

module.exports = {
    resetAccounts,
    handleEvent,
    getBalance
};
