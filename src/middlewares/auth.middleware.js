const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')


async function authMiddleware(req,res,next){

  const token = req.cookies.token


  if(!token){
    return res.status(401).json({
      message:"please login first"
    })
  }


  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET
  )


  const user = await userModel
.findById(decoded.id)
.select("-password")

  if(!user){
    return res.status(401).json({
      message:"user not found"
    })
  }


  req.user = user


  next()

}


module.exports = authMiddleware