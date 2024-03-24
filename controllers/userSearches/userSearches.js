let {userSearches}=require("../../Schema/userSearchesSchema");
let updateUserSearches=async(req,resp)=>{
    try {
      let srch={
        lon:"243",
        lat:"32"
      }
     let srchStat=await isLimitReached(req.params.id);
     if(srchStat){
       let insertedReponse=await userSearches.updateOne({uid:req.params.id},{
        $push:{
            srch:req.body
        }
       })
       resp.send({status:200,data:insertedReponse})
    }
    else{
        resp.send({status:201,msg:"User has reached its search limit"})
    }
    } catch (error) {
       resp.send({status:400,err:"Error occured while inserting the search"}) 
    }
}
let incrementSrchCount=async(req,resp)=>{
    try {
        let srchStat=await isLimitReached(req.params.id);
        if(srchStat){
            let insertedReponse=await userSearches.updateOne({uid:req.params.id},{
             $inc:{
                 searchCount:1
             }
            })
            resp.send({status:200,data:insertedReponse,msg:"Search count incremented"})
         }
         else{
             resp.send({status:201,msg:"User has reached its search limit"})
         }
    } catch (error) {
        resp.send({status:400,err:"Search count couldn't be appended"})
    }
}
let isLimitReached=async(id)=>{
    let limitReponse=await userSearches.findOne({uid:id});
    if(limitReponse.searchCount<limitReponse.allowedNos){
        return true
    }
    else {
        return false
    }
    
}
module.exports={updateUserSearches,incrementSrchCount}