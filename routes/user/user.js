const express=require("express");
let router=express.Router();
let {updateUserSearches}=require("../../controllers/userSearches/userSearches")
let {getUser,getAlluser,createUserViamail,createUserViaGoogle,userLogin,deleteUser,indiUser,userLoginViaGoogle}=require("../../controllers/user/userCont")
router.route("/").get(getUser);
router.route("/getAlluser").get(getAlluser);
router.route("/createUser").post(createUserViamail)
router.route("/userLogin").post(userLogin)
router.route("/insertSearch/:id").put(updateUserSearches)
router.route("/deleteUser/:id").delete(deleteUser)
router.route("/getUserDetails/:id").get(indiUser)
router.route("/createUserViaGoogle").post(createUserViaGoogle)
router.route("/userLoginViaGoogle").post(userLoginViaGoogle)


module.exports=router;