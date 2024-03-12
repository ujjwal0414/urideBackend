const express=require("express");
let {postData}=require("../../controllers/userProblem/prblmControllers")
let problemRouter=express.Router();
problemRouter.route("/").post(postData);








module.exports=problemRouter