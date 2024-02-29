const mongoose=require("mongoose")
const dbConnect=async(dbname)=>{
let dbresp=await mongoose.connect(dbname);
dbresp=dbresp.connection.readyState
if(dbresp===1){
  //  console.log("DatabseConnected");
}
else{
    console.log("Tryinh to connect");
    return
}
}
module.exports={dbConnect}