const nodemailer = require("nodemailer")


const transporter = nodemailer.createTransport({

  service:"gmail",

  auth:{
    user:process.env.EMAIL,
    pass:process.env.EMAIL_PASS
  }

  

})



async function sendEmail(email,otp){


 const info = await transporter.sendMail({

  from:process.env.EMAIL,

  to:email,

  subject:"Account Verification OTP",

  text:`Your verification OTP is ${otp}`

 })


 console.log("Email sent:",info.response)

}




module.exports = sendEmail