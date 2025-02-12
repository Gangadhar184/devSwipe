const express = require("express");

const {userAuth} = require('../middlewares/auth');
const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req,res)=>{
    const user = req.user;
    console.log("connection request sent");
    res.send(user.firstName + " sent request to you");
  
  })

module.exports = requestRouter;
