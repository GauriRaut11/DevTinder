// it loads express and stores it in express variable that now refers to what the Express package exports — importantly, a function that can create an Express application.
const express=require("express"); 

// calls that application fuction and retuns a application object which is stored in the app.
// now app contains all the functions needed to configure and run your Express application.like app.get 

const app=express();

app.get("/",(req,res)=>{
    res.send("Hello i am gauriiii");
})
// app.listen(3000)->starts server at port 3000, () => { ... } → function that runs after the server starts
// console.log(...) → prints a message in your terminal
app.listen(3000, () => {  
    console.log("Server is running on port 3000");
});