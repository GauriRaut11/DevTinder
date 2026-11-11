const express=require("express");
const profilerouter=express.Router();
const User=require("../models/user");
const {userauth}=require("../middlewares/auth");
const cookies=require("cookie-parser");
const {validatefields}=require("../utils/validations")

profilerouter.get("/profile/view",userauth,async(req,res)=>{
    res.send(req.user);
 
});
profilerouter.delete("/delete",async(req,res)=>{
    const userId=req.body.emailId;
 try{
    const user=await User.findByIdAndDelete(userId);
    res.send("deleted");
 }catch(err){
    res.status(404).send("Something went wrong");
 }
});
profilerouter.patch("/profile/edit",userauth,async(req,res)=>{
    try{
      
      const isallowEdit=validatefields(req);
      if(!isallowEdit){
        res.send("Cannnot edit");
      }
      const loggedinuser=req.user;
      Object.assign(loggedinuser, req.body);
      await loggedinuser.save();
      res.send("User information updated successfully");
    }catch(err){
        res.send("something went wrong"+err.message); 
    }

});
module.exports = profilerouter;