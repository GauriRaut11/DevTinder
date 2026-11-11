const express=require("express");
const requestRouter=express.Router();
const {userauth}=require("../middlewares/auth");
const connectionRequestModel=require("../models/connectionrequest");
const { mongo } = require("mongoose");
const User=require("../models/user");

requestRouter.post("/request/send/:status/:userId",userauth,async(req,res)=>
{
    try{
  const fromUserId=req.user._id;
  const toUserId=req.params.userId;
  const status=req.params.status;
  const isallowedstatus=["interested","ignored"];
  if(!isallowedstatus.includes(status)){
    return res.status(400).send("invalid status");
  }
  const toUser=await User.findById(toUserId)
  if(!toUser){
    return res.status(400).send("user not found");
  }
  
const issimilar=await connectionRequestModel.findOne({fromUserId:fromUserId,toUserId:toUserId})
  if(issimilar){
    return res.send("Already "+status)
  }
const request=new connectionRequestModel({
    fromUserId,toUserId,status
  })
  await request.save();
 res.send("connection request send succcessfully")
    }
    catch(err){
        res.send("smthg is wrong"+err.message)
    }
})

requestRouter.post("/request/review/:status/:requestId",userauth,async(req,res)=>{
  try{
    const requestId=req.params.requestId;  // the requestionId in the url is the _id of connectionRequest
  const status=req.params.status;
  const isallowedstatus=["accepted","rejected"];
  if(!isallowedstatus.includes(status)){
    res.status(400).send("Invalid status");
  }
  const ispresent=await connectionRequestModel.findById(requestId)
  if(!ispresent){
    res.send("Invalid");
  }
  if((status=="accepted"||status=="rejected") && ispresent.status=="interested"){
   ispresent.status=status;  // don't do request=new connectionRequestModel because that will create a new document but u only have to modify the existing model
   await ispresent.save();
   res.send("request"+status)
  }else{
    res.send("can't accept or reject a ignore profile")
  }
}catch(err){
  res.send("smthg went wrong "+err.message);
}
})

module.exports=requestRouter;