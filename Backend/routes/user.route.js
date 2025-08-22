const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const userController = require('../controllers/user.controller')

router.post('/register',[
  body('email').isEmail().withMessage('invalid email'),
  body('fullname.firstname').isLength({min:3}).withMessage('first name must by atleast 3 characters'),
  body('password').isLength({min:6}).withMessage('Password must be 6 characters')
],userController.registerUser)






module.exports = router