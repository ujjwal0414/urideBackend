let {userModel}=require("../../Schema/userSchema")
let {userSearches}=require("../../Schema/userSearchesSchema")

const getUser=async(req,resp)=>{
    resp.send({msg:"User starting rout"})
}
const getAlluser=async(req,resp)=>{
    try {
        let data=await userModel.find()
        resp.send({status:200,data:data})
    } catch (error) {
       resp.send({status:400,err:"error finding users"}) 
    }
}
const createUserViamail=async(req,resp)=>{
    let user={
        uid:"",
        gid:"",
        email:"Ujjwal",
        password:"1234"
    }
    //console.log(req.query,req.params,req.body);
    try {
        let checkedUser=await checkUserExistense(req.body.email,req.body.password);
        if(!checkedUser){
        let response=new userModel(req.body);
        
        response=await response.save();
        if(response){
            let usrSrch=new userSearches({
                email:req.body.email,
                uid:response._id
            })
            usrSrch=await usrSrch.save();
          let updatedData=await userModel.findOneAndUpdate(response,{
            uid:response._id
          },{
            new:true
          });
        
         // console.log(updatedData);
          resp.send({status:200,data:updatedData})
        }
        else{
            resp.send({status:403,err:"error while updating"})
        }
        }
        else{
            resp.send({status:201,data:"User already exists"})
        }
    } catch (error) {
        resp.send({status:400,err:"Some error occured"})
    }
}
//creating function to check if user exists or not
let checkUserExistense=async(email,pass)=>{
    let userExs=await userModel.findOne({email:email,password:pass});
    if(userExs===null){
        return false
    }
    else{
        return true
    }
   
}
//function for user signin
let userLogin=async(req,resp)=>{
    try {
        let checkedUser=await checkUserExistense(req.body.email,req.body.password);
        
        if(checkedUser){
            let loggedUser=await userModel.findOne({email:req.body.email,password:req.body.password})
            resp.send({status:200,data:true,msg:"user Exists",uid:loggedUser.uid,gid:loggedUser.gid})

        } 
        else{
            resp.send({status:400,data:false,msg:"User not found"})
        }
    } catch (error) {
        resp.send({status:403,msg:"An error occured"})
    }
}


//only for admin
//delete function for any user
let deleteUser=async(req,resp)=>{
    try {
        let deleteResponse=await Promise.all([userModel.deleteOne({uid:req.params.id}),userSearches.deleteOne({uid:req.params.id})])
        resp.send({status:200,data:deleteResponse});
    } catch (error) {
        resp.send({status:400,msg:"error occured while deleting"});
    }
}
module.exports={getUser,getAlluser,createUserViamail,userLogin,deleteUser}