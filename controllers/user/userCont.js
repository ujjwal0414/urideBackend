let {userModel}=require("../../Schema/userSchema")
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
        let checkedUser=await checkUserExistense(req.body.email);
        if(!checkedUser){
        let response=new userModel(req.body);
        response=await response.save();
        if(response){
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
let checkUserExistense=async(email)=>{
    let userExs=await userModel.findOne({email:email});
    if(userExs===null){
        return false
    }
    else{
        return true
    }
   
}

module.exports={getUser,getAlluser,createUserViamail}