// it loads express and stores it in express variable that now refers to what the Express package exports — importantly, a function that can create an Express application.
const express=require("express"); 
const connectdb=require("./config/database");
const User=require("./models/user");
const cors=require("cors");
const cookies=require("cookie-parser");//And cookies reads/parses the Cookie
// calls that application fuction and retuns a application object which is stored in the app.
// now app contains all the functions needed to configure and run your Express application.like app.get 
const app=express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}

));
app.use(express.json());//express.json() is itself middleware. Express handles the next() call internally.
// get all users 
app.use(cookies());//run the cookies--which is a parser for every incoming requests
const authrouter=require("./routers/auth");
const profilerouter=require("./routers/profile");
const requestRouter=require("./routers/request")
const userRouter=require("./routers/user")
app.use("/",authrouter);
app.use("/",profilerouter);
app.use("/",requestRouter);
app.use("/",userRouter);



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




