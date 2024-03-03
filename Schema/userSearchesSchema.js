const { Decimal128 } = require("mongodb");
const mongoose=require("mongoose")
let PlacesSearches=new mongoose.Schema({
    c1:[Decimal128,Decimal128],
    c2:[Decimal128,Decimal128]
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