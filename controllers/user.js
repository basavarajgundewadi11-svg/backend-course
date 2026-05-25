const User=require("../model/user");
const CreateAccount=async(req,res) => {
   try{
   const {name,email,password}=req.body
 const userdata=await User.create({
    name,email,password
 })

 res.json({
    message:"Account create succesfully",
    userdata
 })
 }
 catch(e){
   res.send(e);
}
}

const login=async (req,res) => {
  try {
    const {email,password}=req.body;
    const userdata = await User.findOne({email});
    if(!userdata){
      throw new Error("User is not found");
      
    }

    if(userdata.password!=password){
      throw new Error("password is invalid");
      
    }
    res.json({
      message:"welcome to Kle COllege ",
      userdata
    })

  } catch (error) {
    res.send(error.message);
  }
}



module.exports={CreateAccount,login}