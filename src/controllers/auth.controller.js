const sendEmail = require('../utils/sendEmail')
const userModel = require('../models/user.model')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')


async function registerController(req,res){

 const {email, username , password , bio} = req.body


 if(!email || !username || !password){

  return res.status(400).json({
   message:"all fields required"
  })

 }


 const isUserAlreadyExists = await userModel.findOne({
 $or:[
  {username:username},
  {email:email}
 ]
})


console.log("REGISTER BODY => ", req.body)

console.log("FOUND USER => ", isUserAlreadyExists)


if(isUserAlreadyExists){

  return res.status(409).json({

   message:
   isUserAlreadyExists.email === email.toLowerCase()
   ?
   "email already exists"
   :
   "username already exists"

  })

 }

  const hash = crypto.createHash('sha256').update(password).digest('hex')

  const otp = Math.floor(
 100000 + Math.random() * 900000
).toString()

 const user= await userModel.create({

 username,
 email,
 bio,
 password:hash,

 otp:otp,

 otpExpire: Date.now() + 10 * 60 * 1000

})

try{

 //await sendEmail(email,otp)

}
catch(error){

 console.log("EMAIL ERROR",error.message)

}


res.status(201).json({

 message:"Account created successfully",

 email:user.email

})



}


async function loginController(req,res){

  const { username, email, password } = req.body


  const user = await userModel.findOne({
    $or:[
      {email},
      {username}
    ]
  })


  if(!user){
    return res.status(404).json({
      message:"user not found"
    })
  }


  const hash = crypto
  .createHash('sha256')
  .update(password)
  .digest('hex')


  if(user.password !== hash){
    return res.status(401).json({
      message:"invalid password"
    })
  }

  if(user.isVerified === false){

 return res.status(401).json({
  message:"please verify your email first"
 })

}


  const token = jwt.sign(
    {
      id:user._id
    },
    process.env.JWT_SECRET,
    {
      expiresIn:"1d"
    }
  )


  res.cookie("token",token,{
  httpOnly:true,
  sameSite:"lax"
})


  res.status(200).json({
    message:"user login successfully",

    user:{
      username:user.username,
      email:user.email,
      bio:user.bio
    }
  })

}

async function verifyOtpController(req,res){

  const {email, otp} = req.body


  const user = await userModel.findOne({email})


  if(!user){

    return res.status(404).json({
      message:"user not found"
    })

  }


  if(user.otp !== otp){

    return res.status(400).json({
      message:"invalid otp"
    })

  }


  if(user.otpExpire < Date.now()){

    return res.status(400).json({
      message:"OTP expired"
    })

  }


  user.isVerified = true

  user.otp = undefined

  user.otpExpire = undefined


  await user.save()


  res.status(200).json({

    message:"email verified successfully"

  })

}

async function getMeController(req,res){

  res.status(200).json({
    message:"user fetched successfully",
    user:req.user
  })

}

async function logoutController(req,res){


  res.clearCookie("token")


  res.status(200).json({

    message:"logout successfully"

  })


}

module.exports = {
  registerController,
  loginController,
  verifyOtpController,
  logoutController,
  getMeController
}