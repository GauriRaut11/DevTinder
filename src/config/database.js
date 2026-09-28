const mongoose=require("mongoose");
const connectdb=async()=>{ //mongoose.connect returns a promise func i.e. an object that represents the result of an asynchronous operation
 await mongoose.connect("mongodb+srv://graut0505_db_user:CnxZv6R4HQwtz4s2@namaste.hsuwfzk.mongodb.net/devtinder");
}
module.exports=connectdb;
