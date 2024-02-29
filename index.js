const express=require("express");
const cor=require("cors");
let user=require("./routes/user/user")
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
app.listen(2183);
