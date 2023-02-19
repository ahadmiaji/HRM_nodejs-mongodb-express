require("dotenv").config();

const server = {
    app: {
        port: process.env.PORT || 5005
    },

    db: {
        url: process.env.DB_URL || "mongodb://localhost:27017/HRM_DEMO"
    },
};

module.exports = server;