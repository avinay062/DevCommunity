const express = require("express");

const app = express(); // instance of an express js application

const connectDB = require("./config/database");

const User = require("./models/user");

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

app.post("/signup", async(req,res)=>{
    const user = new User({
        firstName: "Virat",
        lastName: "Kohli",
        emailId: "virat.kohli@gmail.com",
        password: "virat@123"
    });
   try{
    await user.save();
    res.send("User is Added Successfully..!");
   } catch(err) {
      res.status(400).send("Error Saving the User:" + err.message);
   }  
});


