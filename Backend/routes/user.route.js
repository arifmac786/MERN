const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const userController = require('../controllers/user.controller')

router.post('/register',[
  body('email').isEmail().withMessage('invalid email'),
  body('fullname.firstname').isLength({min:3}).withMessage('first name must by atleast 3 characters'),
  body('password').isLength({min:6}).withMessage('Password must be 6 characters')
],userController.registerUser)

router.post('/login',[
  body('email').isEmail().withMessage('invalid Email'),
  body('password').isLength({min:6}).withMessage('password must be atleast 6 characters')
],
userController.loginUser

)




module.exports = router