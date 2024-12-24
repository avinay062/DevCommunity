const express = require("express");

const app = express(); // instance of an express js application

const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");



app.use(express.json()); // middleware by express.js for reading the data and parsing it to json
app.use(cookieParser()); // middleware by express.js for reading the cookie


const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);



connectDB().then(() => {
    console.log("Database connected established..!");
    //to listen the server
    app.listen(3000, () => {
        console.log("Server is successfully listening on port 3000 !")
    });
})
    .catch((err) => {
        console.log("Database cannot connected..!")
    });






