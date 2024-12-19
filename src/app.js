const express = require("express");

const app = express(); // instance of an express js application

//Request handeler
app.use((req, res)=>{
    res.send("Hello From the serverr !")
});

//request handeler for test route
// app.use("/test",(req, res)=>{
//     res.send("Hello From the server !")
// });

app.listen(3000, ()=>{
    console.log("Server is successfully listening on port 3000 !")
});