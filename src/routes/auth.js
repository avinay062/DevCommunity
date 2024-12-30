const express = require("express");
const authRouter = express.Router();
const { validateSignupData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require('bcryptjs');



//POST API for signup
authRouter.post("/signup", async (req, res) => {
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

        const savedUser = await user.save();
        const isPasswordvalid = await user.validatePassword(password);
        if (isPasswordvalid) {
            //create a JWT token
            const token = await savedUser.getJWT();
            res.cookie('token', token, { expires : new Date( Date.now() + 8 * 3600000)});
            res.json({message: "User is Added Successfully..!", data: savedUser});
        } else {
            throw new Error("Invalid Credentials");
        }
        
    } catch (err) {
        res.status(400).send("Error Saving the User: " + err.message);
    }
});

//signIn API

authRouter.post("/login", async (req, res) => {

    try {
        const { emailId, password } = req.body;

        //check if email id is present in DB

        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            throw new Error("Invalid Credentials");
        }

        //check if password is valid

        const isPasswordvalid = await user.validatePassword(password); // return a boolean
        if (isPasswordvalid) {
            //create a JWT token
            const token = await user.getJWT();
            //Add the token to cookie and send the response to the user
            // use httpOnly: true, only to work http url
            res.cookie('token', token, { expires : new Date( Date.now() + 8 * 3600000)});
            res.json(user);
        } else {
            throw new Error("Invalid Credentials");
        }
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }

});

//logout API

authRouter.post("/logout", async(req, res)=>{
    res.cookie("token", null , {
        expires : new Date(Date.now())
    });
    res.send("Logged out Successfully");
})

module.exports = authRouter;