const mongoose=require("mongoose");
let prblmSchema=new mongoose.Schema({
    problemList:[String],
    problemDesc:String
},
{
    timestamps:true
}

)
let userProblem=new mongoose.Schema({
    email:String,
    ProblemList:[prblmSchema]
})
let prblmMode=mongoose.model("userproblems",userProblem)
module.exports={prblmMode}