const express = require("express");

const app = express(); // instance of an express js application

const connectDB = require("./config/database");

const User = require("./models/user");

app.use(express.json()); // middleware by express.js for reading the data and parsing it to json

//POST API for signup
app.post("/signup", async(req,res)=>{
    const user = new User(req.body);
   try{
    await user.save();
    res.send("User is Added Successfully..!");
   } catch(err) {
      res.status(400).send("Error Saving the User:" + err.message);
   }  
});

//get user by Email id
app.get("/user", async(req,res)=>{
    const userEmail = req.body?.emailId;
    try{
        const users = await User.find({emailId : userEmail});
        if(users.length === 0){
            res.status(406).send("user not found");
        } else {
            res.send(users);
        }
    } 
    catch(err){
        res.status(400).send("Error Getting the User detail");
    }   
});

//get user by Email id and find one documentt
// app.get("/user", async(req,res)=>{
//     const userEmail = req.body?.emailId;
//     try{
//         const users = await User.findOne({emailId : userEmail});
//         if(users.length === 0){
//             res.status(406).send("user not found");
//         } else {
//             res.send(users);
//         }
//     } 
//     catch(err){
//         res.status(400).send("Error Getting the User detail");
//     }   
// });

//get All Document
app.get("/feed", async(req,res)=>{
    try{
        const users = await User.find({});
        if(users.length === 0){
            res.status(406).send("user not found");
        } else {
            res.send(users);
        }
    } 
    catch(err){
        res.status(400).send("Error Getting the User detail");
    }   
});



connectDB().then(()=>{
    console.log("Database connected established..!");
    //to listen the server
    app.listen(3000, ()=>{
        console.log("Server is successfully listening on port 3000 !")
    });
})
.catch((err)=>{
    console.log("Database cannot connected..!")
});






