const express = require("express");

const app = express(); // instance of an express js application

const connectDB = require("./config/database");

const User = require("./models/user");

const { validateSignupData } = require("./utils/validation");

const bcrypt = require('bcryptjs');


app.use(express.json()); // middleware by express.js for reading the data and parsing it to json

//POST API for signup
app.post("/signup", async (req, res) => {
    try {
        //validation of data
        validateSignupData(req);
        // encrypt password
        const { firstName, lastName, emailId, password } = req.body;
        const passwordhash = await bcrypt.hash(password, 5);

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordhash
        });

        await user.save();
        res.send("User is Added Successfully..!");
    } catch (err) {
        res.status(400).send("Error Saving the User: " + err.message);
    }
});

//signIn API

app.post("/login", async (req, res) => {

    try {
        const { emailId, password } = req.body;

        //check if email id is present in DB

        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            throw new Error("Invalid Credentials");
        }

        //check if password is valid
        
        const isPasswordvalid = await bcrypt.compare(password , user.password); // return a boolean
        if(isPasswordvalid){
            res.send("Login Successfully");
        } else{
            throw new Error("Invalid Credentials");
        }
    } catch (err) {
        res.status(400).send("Error Saving the User: " + err.message);
    }

})

//get user by Email id
app.get("/user", async (req, res) => {
    const userEmail = req.body?.emailId;
    try {
        const users = await User.find({ emailId: userEmail });
        if (users.length === 0) {
            res.status(406).send("user not found");
        } else {
            res.send(users);
        }
    }
    catch (err) {
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
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        if (users.length === 0) {
            res.status(406).send("user not found");
        } else {
            res.send(users);
        }
    }
    catch (err) {
        res.status(400).send("Error Getting the User detail");
    }
});

//Delete user by id

app.delete("/user", async (req, res) => {
    const userId = req.body?.userId;
    try {
        const users = await User.findByIdAndDelete(userId);
        if (users.length === 0) {
            res.status(406).send("user not found");
        } else {
            res.send("user deleted Successfully..!");
        }
    }
    catch (err) {
        res.status(400).send("Error Getting the User detail");
    }
});

//Update by User id
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;
    try {
        const ALLOWED_UPDATES = ['photoUrl', 'about', 'skills', 'age', 'password', 'gender'];
        const isUpdateAllowed = Object.keys(data).every((k) =>
            ALLOWED_UPDATES.includes(k)
        );
        if (!isUpdateAllowed) {
            throw new Error("Update not Allowed");
        }
        if (data?.skills.length > 10) {
            throw new Error("Skills more than 10 not Allowed");
        }
        const users = await User.findByIdAndUpdate(userId, data, {
            returnDocument: "after",
            runValidators: true
        });
        if (users.length === 0) {
            res.status(406).send("user not found");
        } else {
            res.send("user updated Successfully..!");
        }
    }
    catch (err) {
        res.status(400).send("Update failed:" + err.message);
    }
});

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






