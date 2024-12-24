const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");


//Reading user details

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send("Profile data Fetched: " + user); 
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }

});

profileRouter.patch("/profile/edit", userAuth, async(req,res)=>{
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit Request");
        } else {
            const loggedInUser = req.user;
            console.log(loggedInUser);

            Object.keys(req.body).forEach(key=> (loggedInUser[key] = req.body[key]));

            console.log(loggedInUser);
            await loggedInUser.save();
            //res.send(`${loggedInUser.firstName}, your profile is Updated !!`);
            res.json({ message : `${loggedInUser.firstName}, your profile is Updated !!` , data : loggedInUser});
        }


    } catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
})



module.exports = profileRouter;