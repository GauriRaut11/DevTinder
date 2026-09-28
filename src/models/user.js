const mongoose=require("mongoose");
 const userschema =new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String
    },
    password:{
        type:String
    },
    age:{
        type:Number
    }
 });
 module.exports=mongoose.model("User",userschema);