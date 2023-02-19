const mongoose = require("mongoose");
const config = require("./config");

const dbURL = config.db.url;

mongoose.set('strictQuery', false);

const dbConnection = () => {
    mongoose.connect(dbURL)
        .then(() => {
            console.log('mongodb is connected');
        })
        .catch(() => {
            console.log(error);
            process.exit(1);
        })
}

module.exports = dbConnection;