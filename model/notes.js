const mongoose=require("mongoose");
const noteSchema = new mongoose.Schema({
    heading:{
        type:String,
        required:true,
        uppercase:true
    },
    content:{
        type:String,
        required:true
    }
    })
    module.exports = mongoose.model("notes",noteSchema);