const express=require("express");
let router=express.Router();
let {updateUserSearches}=require("../../controllers/userSearches/userSearches")
let {getUser,getAlluser,createUserViamail,userLogin,deleteUser,indiUser}=require("../../controllers/user/userCont")
router.route("/").get(getUser);
router.route("/getAlluser").get(getAlluser);
router.route("/createUser").post(createUserViamail)
router.route("/userLogin").post(userLogin)
router.route("/insertSearch/:id").put(updateUserSearches)
router.route("/deleteUser/:id").delete(deleteUser)
router.route("/getUserDetails/:id").get(indiUser)


module.exports=router;