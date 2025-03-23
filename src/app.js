const express = require("express");

const app = express(); // instance of an express js application

const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Add port configuration
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: true, // This accepts all origins but maintains the security checks
    credentials: true
}));
app.use(express.json()); // middleware by express.js for reading the data and parsing it to json
app.use(cookieParser()); // middleware by express.js for reading the cookie

// All API routes
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);



connectDB().then(() => {
    console.log("Database connected established..!");
    //to listen the server
    app.listen(PORT, () => {
        console.log(`Server is successfully listening on port ${PORT} !`)
    });
})
    .catch((err) => {
        console.log("Database cannot connected..!")
    });






