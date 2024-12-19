const express = require("express");

const app = express(); // instance of an express js application

//Request handeler
app.use("/hello/1",(req, res)=>{
    res.send("Hello From hello!")
});

//get call
app.get("/test",(req, res)=>{
    res.send("data fetched successfully !")
});

// POST call

app.post("/test",(req, res)=>{
    console.log("saving data to db");
    res.send("data saved successfully !")
});


//request handeler for test route
// this will match all HTTP methods
app.use("/test",(req, res)=>{
    res.send("Hello From the Test !")
});

//wildcard route
app.use("/",(req, res)=>{
    res.send("Hello Avinay !")
});

app.listen(3000, ()=>{
    console.log("Server is successfully listening on port 3000 !")
});