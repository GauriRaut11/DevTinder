const express=require("express");
const userRouter=express.Router();
const {userauth}=require("../middlewares/auth");
const connectionRequestModel=require("../models/connectionrequest")
const User=require("../models/user")

userRouter.get("/request/user/pending",userauth,async(req,res)=>{
 
 try{
   const show=await connectionRequestModel.find(
    {
        toUserId:req.user._id,
        status:"interested"
    }
   ).populate("fromUserId",  ["firstName" ,"lastName"])
   res.json({
    message:"shown successfully",
    data:show
   })
 }catch(err){
    res.send("smthg is wrong "+err.message);
 }
})

userRouter.get("/request/connections",userauth,async(req,res)=>{
 try{const loggedInUserId=req.user;
const show=await connectionRequestModel.find({
    status:"accepted",
    $or: [
                { fromUserId: loggedInUserId },
                { toUserId: loggedInUserId }
            ]
}).populate("fromUserId",["firstName","lastName","skills","age"]); //Take the fromUserId ObjectId and replace it with the corresponding User document, but only give me firstName and lastName (plus _id).
res.json({
    message:"these are your connections",
    data:show
})
 }catch(err){
    res.send("smthg is wrong "+err.message)
 }
})

userRouter.get("/feed",userauth,async(req,res)=>{
    try{
        const page=parseInt(req.query.page || 1); //req.query- value after "?"
        let limit=parseInt(req.query.limit || 10);
        limit=limit>50 ? 50:limit //condition ? valueIfTrue : valueIfFalse
        const skip=(page-1)*limit
     const loggedInUser=req.user._id;
     const connectionrequest=await connectionRequestModel.find({
    $or:[{  fromUserId:loggedInUser},{toUserId:loggedInUser}]
    })
     const hideUsers=new Set();
     connectionrequest.forEach(req=>{
     hideUsers.add(req.fromUserId.toString());
     hideUsers.add(req.toUserId.toString());
     })
    const users=await User.find({  //$nin-mongodb operators
        _id:{      //Find all users except the users whose IDs are stored in hideUsers.
        $nin: Array.from(hideUsers) //$nin-“Not In.”The reason we use Array.from(hideUsers) is that MongoDB's $nin expects an array of values
        
        }
    }).select("firstName lastName photoUrl age about skills").skip(skip).limit(limit)
 res.send(users);
    }catch(err){
        res.status(400).json({message:"something went wrong"+err.message})
   
    }
})
module.exports=userRouter;