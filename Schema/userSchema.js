const mongoose=require("mongoose")
let userSchema=new mongoose.Schema({
    isGoogleSigned:{type:Boolean,default:false},
    uid:String,
    gid:String,
    email:String,
    password:String
})
let userModel=mongoose.model("user",userSchema)
module.exports={userModel}