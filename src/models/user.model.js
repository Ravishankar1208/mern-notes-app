const mongoose=require('mongoose')


const userSchema=new mongoose.Schema({

  username:{
    type:String,
    unique:[true,"username already exists"],
    required:[true,"username is required"]
  },


 email:{
  type:String,
  unique:true,
  required:[true,"email is required"],
  lowercase:true,
  trim:true
},


  password:{
    type:String,
    required:[true,"password is required"]
  },


  bio:String,


  isVerified:{
 type:Boolean,
 default:true
},


  otp:{
    type:String
  },


  otpExpire:{
    type:Date
  }


})


const userModel = mongoose.model("user", userSchema)


module.exports = userModel