// it loads express and stores it in express variable that now refers to what the Express package exports — importantly, a function that can create an Express application.
const express=require("express"); 
const connectdb=require("./config/database");
const User=require("./models/user");
const user = require("./models/user");
// calls that application fuction and retuns a application object which is stored in the app.
// now app contains all the functions needed to configure and run your Express application.like app.get 
const app=express();
app.use(express.json());//express.json() is itself middleware. Express handles the next() call internally.
// get all users 
app.get("/feed",async (req,res)=>{
    try{
 const user=await User.find({});
 res.send(user);
    }catch(err){
        res.send(500).send("something went wrong")
    }
})
// get a single user
app.get("/user", async (req,res)=>{
    const useremail=req.body.emailId;
    try{
        const users=await User.find ({emailId:useremail});//this func finds the document using email and stores it in a array user is a array here
        if(users.length==0){
          res.send("user not found");
        } 
        res.send(users);
    }catch(err){
        res.status(404).send("Something went wrong")
    }
});
app.delete("/delete",async(req,res)=>{
    const userId=req.body.emailId;
 try{
    const user=await User.findByIdAndDelete(userId);
    res.send("deleted");
 }catch(err){
    res.status(404).send("Something went wrong");
 }
});

app.patch("/update",async(req,res)=>{
    const userid=req.body._id;
    const data=req.body;
    try{
        await User.findByIdAndUpdate({_id:userid},data);
        res.send("Updated successfullly");
    }catch(err){
        res.send("something went wrong"); 
    }
})


app.post("/signup",async (req,res)=>{
// creating a instance of the model User
const user=new User(req.body);
try{
await user.save();// this func saves document to the database 
res.send("document added to the database");
console.log(req.body);
}catch(err){
res.status(101).send("Error in adding data")
}
});







// connectdb is called and it is a async func so it returns a promise func
connectdb().then(()=>{ // .then()-->"If the Promise is successfully completed, execute this function."
   console.log("connected sucessfully")
   // app.listen(3000)->starts server at port 3000, () => { ... } → function that runs after the server starts
// console.log(...) → prints a message in your terminal
app.listen(3000, () => {  
    console.log("Server is running on port 3000");
});
}).catch((err)=>{ //.catch(err)-->"If the Promise fails/rejects, execute this function."
     console.error("Database connection failed", err.message) //console.error prints a error msg it is very similar to console.log
});
//err has all the info abt the error 




