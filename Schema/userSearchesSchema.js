const mongoose=require("mongoose")
let PlacesSearches=new mongoose.Schema({
    lon:String,
    lat:String
})
let userSearchSchema=new mongoose.Schema({
    email:String,
    uid:String,
    gid:String,
    srch:[PlacesSearches],
    searchCount:{type:Number,default:0}
})
let userSearches=mongoose.model("usersearches",userSearchSchema);
module.exports={userSearches}