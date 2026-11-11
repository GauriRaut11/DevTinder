const validator=require("validator");
const { validate } = require("../models/user");

const validatesignup=(req)=>{ //not a callback func
    const {firstName,lastName,password}=req.body; //const firstName = req.body.firstName;
                                                  //const lastName = req.body.lastName;
                                                  //const password = req.body.password;
    if(firstName==lastName){
        throw new Error("firstname and lastname can't be the same ");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error ("enter a  strong password");
    }
}

const validatefields=(req)=>{
    const allowedit=[
        "firstName","lastName","skills","about"
    ]
    const isallowEdit=Object.keys(req.body).every(key=>allowedit.includes(key)); //Object.keys(req.body) gives: ["firstName", "age"] .every() checks:
//"Is every key in the request present in my allowedit array?

    return isallowEdit;
}
module.exports={
    validatesignup, validatefields
}