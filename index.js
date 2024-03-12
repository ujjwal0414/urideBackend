const express=require("express");
const cor=require("cors");
let user=require("./routes/user/user")
let pRouter=require("./routes/UserProblem/userProblem")
const app=express();
app.use(express.json());
app.use(cor());
const dotenv=require("dotenv")
dotenv.config();
let mongoUrl=process.env.mongoUrl
let {dbConnect}=require("./utils/dbConnection")
dbConnect(mongoUrl)
app.get("/",(req,resp)=>{
    resp.send({status:"running"})
})
app.use("/user",user)
app.use("/userProblem",pRouter)
app.listen(2183);
