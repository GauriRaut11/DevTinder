const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const cookies=require("cookie-parser");
 const userschema =new mongoose.Schema({
    firstName:{
        type:String,
        required:true,

    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        unique:true, // if unquie is true that field is automatically indexed
        lowercase:true,
        trim:true,
        validate(value){// db validation 
            if(!validator.isEmail(value)){
                throw new Error("invalid email address"+value);
            }
        }
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        min:18,
        max:100,
    },
    about:{
       type:String,
       default:"this is a default about"
    },
    photourl:{
        type:String,
       
        validate(value){// db validation  //value is simply the actual value of that field that Mongoose is validating.
            if(!validator.isURL(value)){
                throw new Error("invalid url"+value);
            }
        }
    },
    skills:{
        type:[String],
        validate(value){
           if(value.length>5){ 
            throw new Error("Can't enter more than 5 skills")
           }
        }
    }

 });
 //MongoDB creates an index, so it can find the matching user much more efficiently.
userschema.index({firstName:1}); // 1-- ascending order
userschema.index({gender:1});
 userschema.methods.getJWT= function(){
const user=this;//this refers to the user document in the login method
 const token= jwt.sign({_id:user._id},"DEV@Tinder67");//creating a token here u are hiding the _id and adding a secret password which will be used to generate your tokken
 
 return token;
}

userschema.methods.getPass= async function(password){
    const user=this;
    const isvalidpassword=await bcrypt.compare(password,user.password);
    return isvalidpassword;
}
 module.exports=mongoose.model("User",userschema);
