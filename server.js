// console.log("hello");
const express = require("express");
const app=express();
require("dotenv").config()
const port=process.env.port;
const { default: mongoose } = require("mongoose"); //
const mangoose = require("mongoose");

const {CreateAccount,login}=require("./controllers/user")
const {createNotebook,getNotes,updateNotebook,deleteNotebook}=require("./controllers/notes")
app.use(express.json());

app.post("/CreateNotebook",createNotebook);
app.post("/allNotes",getNotes);
app.put("/update/:id",updateNotebook);
app.post("/signin",CreateAccount);
app.post("/login",login);
app.delete("/delete/:id",deleteNotebook);

mongoose.connect(process.env.mongo_url)
.then(()=>{
    console.log("mongoDB is connected")
    
    app.listen(port,()=>{
        console.log(`Server is running PORT number ${port}`)
    })
})
.catch((e)=>{
    console.log("ERROR",e);
})