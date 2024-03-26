let {prblmMode}=require("../../Schema/userProblemSchema")
let findUser=async(userEmail)=>{
    let foundUser=await prblmMode.findOne({email:userEmail});
    if(foundUser){
        return true
    }
    else{
        return false
    }
}
let saveUser=async(userData)=>{
    try {
    let data=new prblmMode(userData);
    data=await data.save();
    return data
    } catch (error) {
       return "Unable to save the problem" 
    }
}
let postData=async(req,resp)=>{
    let payLoad=req.body;
    let result=await findUser(payLoad.email)
    if(!result){
        let savedUserResponse=await saveUser(payLoad)
        resp.send({status:200,msg:savedUserResponse});
    }
    else{
        try {
            let pushProblem=await prblmMode.findOneAndUpdate({email:payLoad.email},{
                $push:{
                 ProblemList:payLoad.ProblemList
                }
             },
             {
                new:true
             }

             )
             resp.send({status:201,data:pushProblem,msg:"Problem inserted"})
        } catch (error) {
           resp.send({status:400,msg:"Unable to push data"}) 
        }

    }
    
}
module.exports={postData}