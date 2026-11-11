const express=require("express");
const authrouter=express.Router();
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const{validatesignup}=require("../utils/validations");
const validator =require("validator");
const User=require("../models/user");
const cookies=require("cookie-parser");
const {userauth}=require("../middlewares/auth");
authrouter.post("/signup" ,async (req,res)=>{

const {firstName,lastName,emailId,password,age,
        skills,
        photourl,
        about}=req.body;
const passwordhash= await bcrypt.hash(password,10);
// creating a instance of the model User
const user=new User({
     firstName,
        lastName,
        emailId,
        password: passwordhash,
        age,
        skills,
        photourl,
        about
}); 
try{
validatesignup(req);
await user.save();// this func saves document to the database 
res.send("document added to the database");
console.log(req.body);
}catch(err){
res.status(400).send("Error in adding data"+err.message)
}
});

authrouter.post("/login",async(req,res)=>{
    try{
        const{emailId,password}=req.body;//object deconstructor
        const user=await User.findOne({emailId:emailId})//user contains the found document when u use find it will return array of all documnets[d1,d2,d3] with same cond here since email is unique it will return [document]so it nnot possicle to access user.password 
        if(!user){
            res.send("Email not found");
        }
    
        const isvalidpassword=user.getPass(password);
        if(!isvalidpassword){
            res.send("Incorrect password");
        }
        else{
            const token =user.getJWT();
            res.cookie("token",token);// creating and sending the cookie to the user
            res.send(user);
        }
    }catch(err){
        res.send("something went wrong"+err.message);
    }
})

authrouter.post("/logout", (req, res) => {
    res.clearCookie("token");//- res.clearCookie() → removes a cookie from the browser.
    res.send("logged out");
});

module.exports = authrouter;

