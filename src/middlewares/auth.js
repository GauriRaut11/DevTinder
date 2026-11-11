const cookies=require("cookie-parser");
const jwt=require("jsonwebtoken");
const User = require("../models/user");


const userauth= async (req,res,next)=>{// this means const userAuth = function(req, res, next) {
    try{
   const {token}=req.cookies;
   if (!token) {
            return res.status(401).send("Please login");
        }
     const decoded=await jwt.verify(token,"DEV@Tinder67");
       const user=await User.findById(decoded);
       if(!user){
           res.send("profile not found");
       }
       req.user = user;//attch the user data to req.user so that the next func can aslo access it 
       next();//next() tells Express to continue to the next function in the middleware chain. sonow continue with (req,res)
    }catch(err){
        res.send("smthg went wrong"+err.message);
    }
};
module.exports={
userauth
}