let {userModel}=require("../../Schema/userSchema")
let {userSearches}=require("../../Schema/userSearchesSchema")
let {sendEmailResponse}=require("../../MailPackage/mail")
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
        let checkedUser=await checkUserExistense(req.body.email,req.body.password,false);
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
         sendEmailResponse(req.body.email)
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
let checkUserExistense=async(email,pass,loginType)=>{
    let userExs=null;
    if(loginType){
        userExs=await userModel.findOne({email:email,password:pass});
    }
    else{
        userExs=await userModel.findOne({email:email}); 
    }
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
        let checkedUser=await checkUserExistense(req.body.email,req.body.password,true);
       
        if(checkedUser){
            let loggedUser=await userModel.findOne({email:req.body.email,password:req.body.password})
            
            resp.send({status:200,data:true,msg:"user Exists",uid:loggedUser.uid,gid:loggedUser.gid,userType:loggedUser.userType})

        } 
        else{
            resp.send({status:400,data:false,msg:"Incorrect email or password"})
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

//function for gettinh user details
let indiUser=async(req,resp)=>{
    try {
      let id=req.params.id;
      let userResponse=await userModel.findOne({uid:id}) 
      if(userResponse!==null){
        let {srch,searchCount}=await userSearches.findOne({uid:id});

        resp.send({status:200,data:userResponse,routes:srch,srchCount:searchCount})
      }  
      else{
        resp.send({status:201,msg:"user not found"});
      }
    } catch (error) {
        resp.send({status:400,msg:"An error occured"});
    }
}
let createUserViaGoogle=async(req,resp)=>{
    try {
        let checkedUser=await checkUserExistense(req.body.email,"",false);
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
             sendEmailResponse(req.body.email)
              resp.send({status:200,data:updatedData})
            }
            else{
                resp.send({status:403,err:"error while updating"})
            }
        }
        else{
            resp.send({status:201,data:"user exists"})

        }
    } catch (error) {
       resp.send({status:400,msg:"Unable to create user"}) 
    }
}
//creating function to check if user exists or not via google or not
let checkUserExistenseViaGoogle=async(email,gid,loginType)=>{
    let userExs=null;
    if(loginType){
        userExs=await userModel.findOne({email:email});
    }
    if(userExs===null){
        return false
    }
    else{
        return true
    }
   
}
let userLoginViaGoogle=async(req,resp)=>{
    try {
        let checkedUser=await checkUserExistenseViaGoogle(req.body.email,req.body.gid,true);
        if(checkedUser){
            let loggedUser=await userModel.findOne({email:req.body.email,gid:req.body.gid})
            
            resp.send({status:200,data:true,msg:"user Exists",uid:loggedUser.uid,gid:loggedUser.gid,userType:loggedUser.userType})

        } 
        else{
            resp.send({status:400,data:false,msg:"Incorrect email provided"})
        }
    } catch (error) {
        resp.send({status:403,msg:"An error occured"})
    }
}
module.exports={getUser,getAlluser,createUserViamail,userLogin,deleteUser,indiUser,createUserViaGoogle,userLoginViaGoogle}