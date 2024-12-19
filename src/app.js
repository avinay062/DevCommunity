const express = require("express");

const app = express(); // instance of an express js application

// /abc, /ac, 
// app.get("/test/:userId/:name/:password",(req, res)=>{
//     console.log(req.params);
//     res.send({firstName: "Avinay", lastName : "Kumar"})
// });


// //Request handeler
// app.use("/hello/1",(req, res)=>{
//     res.send("Hello From hello!")
// });

// //get call
// app.get("/test",(req, res)=>{
//     res.send("data fetched successfully !")
// });

// // POST call

// app.post("/test",(req, res)=>{
//     console.log("saving data to db");
//     res.send("data saved successfully !")
// });


// //request handeler for test route
// // this will match all HTTP methods
// app.use("/test",(req, res)=>{
//     res.send("Hello From the Test !")
// });

// //wildcard route
// app.use("/",(req, res)=>{
//     res.send("Hello Avinay !")
// });

//Multiple Route handeler
app.use(
    "/test",
    (req,res,next)=>{
    console.log("First route handeler !");
    //res.send("Response 1");
    next();
},
(req,res,next)=>{
    console.log("Second route handler !");
    //res.send("Response 2");
    next();
},
(req,res,next)=>{
    console.log("Third route handler !");
    res.send("Response 3");
});

app.listen(3000, ()=>{
    console.log("Server is successfully listening on port 3000 !")
});