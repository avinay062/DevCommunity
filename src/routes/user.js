const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";
const User = require("../models/user");

//find all the pending connection requests

userRouter.get("/user/requests/received", userAuth, async(req,res)=>{
  try{
    const loggedInUser = req.user;
    const data = await ConnectionRequest.find({
        toUserId: loggedInUser._id,
        status: "interested"
    }).populate("fromUserId", USER_SAFE_DATA);
    
    res.json({
        data
    });

  } catch(err){
    res.status(400).send("ERROR: "+ err.message);
  }
});

userRouter.get("/user/connections", userAuth, async(req,res)=>{
  try{
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
        $or: [
            { toUserId: loggedInUser._id, status: "accepted"},
            { fromUserId: loggedInUser._id, status: "accepted"}
        ]
    }).populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);
    //console.log(connectionRequest);
    const data = connectionRequest.map(
        row => {  
            if(row.fromUserId._id.equals(loggedInUser._id)){
                return row.toUserId
            }
            return row.fromUserId;
        });
    //console.log(data);
    res.json({data});

  } catch(err){
    res.status(400).send("ERROR: "+ err.message);
  }
});

userRouter.get("/feed", userAuth, async(req,res)=>{
  try{
    const loggedInUser = req.user;

    //pagination
    const page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    let connectionRequest = await ConnectionRequest.find({
        $or: [
            {fromUserId : loggedInUser._id},
            {toUserId : loggedInUser._id}
        ]
    }).select("fromUserId toUserId");

    let hideUserFromFeed = new Set();
    connectionRequest.forEach((req)=>{
        hideUserFromFeed.add(req.fromUserId.toString());
        hideUserFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
        $and:[
            {_id: {$nin : Array.from(hideUserFromFeed)}},
            {_id: {$ne: loggedInUser._id}}
        ]
    }).select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);
      
    res.json({message: "data fetched Successfully", data: users});

  } catch(err){
    res.status(400).send("ERROR: "+ err.message);
  }
});

module.exports = userRouter;