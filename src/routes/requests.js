const express = require("express");
const requestsRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

//sending connection request

requestsRouter.post("/sendConnectionRequest", userAuth, async(req,res)=>{
    const user = req.user;
    res.send(user.firstName + "Sent the Request");
})

module.exports = requestsRouter;