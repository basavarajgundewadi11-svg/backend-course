const express=require("express");
const app=express();
const mongoose=require("mongoose");
require("dotenv").config();
const port=process.env.port;
const mongo_url=process.env.mongo_url;

app.use(express.json());



mongoose.connect(process.env.mongo_url)
.then(()=>{
    console.log("mongoosedb is succesfully connected")
    app.listen(port,() => {
    console.log(`server is running port number ${port}`);
})
})


.catch((e)=>{
    console.log("something went wrong",e)
})

//console.log("hi");
// console.log("hi");
app.get("/way",(request,response)=>{
    response.send("way api");
});



app.get("/login",(req,res)=>{
    try {
        const userdata=req.body;
        console.log(userdata);
        res.json({
            message:"login succesfully",
            userdata
        })
    } catch (error) {
        console.log("something went wrong");
    }

})
