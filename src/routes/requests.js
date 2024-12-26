const express = require("express");
const requestsRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const ConnectionRequestModel = require("../models/connectionRequest");

//sending connection request

requestsRouter.post("/request/send/:status/:toUserId", userAuth, async(req,res)=>{
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        //check  if touserId is exist
         const toUser = await User.findById(toUserId);
         if(!toUser){
            return res.status(404).json({
                message: "User Not Found"
            });
         }

        //check for only take Interested or ignored status:

        const allowedStatus = ["interested", "ignored"];
        if(!allowedStatus.includes(status)){
           return res.status(400).json({
            message: "invalid Status type: " + status
           });
        }
        
        //check for Existing connection Request

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId , toUserId }, //if sender and receiver ids are already present in db
                { fromUserId: toUserId , toUserId : fromUserId } // if combination of sender to receiver vice versa is exist in db
            ]
        });

        if(existingConnectionRequest){
            return res.status(400).json({
                message: "Connection Request Already Exists"
            });
        }
        //
    
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });
    
        const data = await connectionRequest.save();
    
        res.json({
            message: req.user.firstName + " " + status + " " + toUser.firstName,
            data
        });
    } catch (err){
        res.status(400).send("ERROR: " + err.message);
    }
    
});

requestsRouter.post("/request/review/:status/:requestId", userAuth, async(req, res)=>{
    try{
        const loggedInUser = req.user;
        const { status, requestId } = req.params;

        const allowedStatus = ["accepted", "rejected"];

        if(!allowedStatus.includes(status)){
            return res.status(400).send("Invalid Status !!");
        }

        console.log(requestId,loggedInUser.firstName)

        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId : loggedInUser,
            status: "interested"
        });

        if(!connectionRequest){
            return res.status(404).send("connection request not found");
        }

        connectionRequest.status = status;

        const data = await connectionRequest.save();
        res.json({ message : "Connection Request " + status, data});
    } catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
});

module.exports = requestsRouter;