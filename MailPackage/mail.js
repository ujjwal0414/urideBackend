let nodemailer=require("nodemailer");
const dotenv=require("dotenv")
dotenv.config();
let htmlTemp=`<div style="text-align: center; padding: 20px; background-color: #f0f0f0;">
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_cIJcMpa5ZKxWkthx054wpRLlgItkSt0YqQ&usqp=CAU" alt="pngimg" style="max-width: 100%; height: auto; border-radius: 10px;"/>
<h2 style="color: #333; font-family: 'Arial', sans-serif;">Hello there</h2>
<h3>Click the continue button below to avail our services. Your suggestions are heartly welcomed and valuable.Do share your experience!</h3>
<button style="background-color: purple; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">
<a style="color:white ;text-decoration: none;" href="https://thedevil.onrender.com"><h3>Continue</h3></a>
</button>
</div>
`
let transportOption=nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    requireTLS:true,
    auth:{
        user:"uJEX04@gmail.com",
        pass:`${process.env.smtpauth}`
    }
})


let sendEmailResponse=(email)=>{
    let mailOption={
        from:"Welcome to uRide <uJEX04@gmail.com>",
        to:email,
        subject:"Welcome to the uRide services",
        html:htmlTemp
     }
    transportOption.sendMail(mailOption,(err,info)=>{
        if(err){
       console.log(err);
       return true
        }
        else{
            console.log(info);
            return false
            
        }
    })
}

module.exports={sendEmailResponse}
