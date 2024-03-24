const mongoose=require("mongoose")
let userSchema=new mongoose.Schema({
    isGoogleSigned:{type:Boolean,default:false},
    uid:String,
    gid:String,
    email:String,
    password:String,
    phone:Number,
    userProfilePic:{type:String,default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"},
    userType:String,
    userSubscription:{type:Number,default:25}
})
let userModel=mongoose.model("user",userSchema)
module.exports={userModel}