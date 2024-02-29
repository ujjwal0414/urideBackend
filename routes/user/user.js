const express=require("express");
let router=express.Router();
let {getUser,getAlluser,createUserViamail}=require("../../controllers/user/userCont")
router.route("/").get(getUser);
router.route("/getAlluser").get(getAlluser);
router.route("/createUser").post(createUserViamail)



module.exports=router;