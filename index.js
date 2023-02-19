const express = require("express");
const dbConnection = require("./config/db.js");
const { notFound, errorHandler } = require("./middlewares/error-handler.js");

const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); //cookieParser is use for refreshToken

const router = require("./routes/index.js");

app.use(router);

//middlware 
app.use(notFound);
app.use(errorHandler);

const PORT = 5005;

dbConnection();

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
});