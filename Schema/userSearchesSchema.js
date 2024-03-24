const { Decimal128 } = require("mongodb");
const mongoose=require("mongoose")
let PlacesSearches=new mongoose.Schema({
    route:[String,String]
})
let userSearchSchema=new mongoose.Schema({
    email:String,
    uid:String,
    gid:String,
    allowedNos:{type:Number,default:25},
    srch:[PlacesSearches],
    searchCount:{type:Number,default:0}
})
let userSearches=mongoose.model("usersearches",userSearchSchema);
module.exports={userSearches}