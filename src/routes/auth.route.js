const express = require("express")
const authMiddleware = require('../middlewares/auth.middleware')
const authController = require('../controllers/auth.controller')
const authRouter= express.Router()



authRouter.post('/register',authController.registerController)

authRouter.post('/login', authController.loginController)

authRouter.post(
  '/verify-otp',
  authController.verifyOtpController
)

authRouter.post(
  '/logout',
  authController.logoutController
)

authRouter.get(
  '/get-me',
  authMiddleware,
  authController.getMeController
)

module.exports = authRouter