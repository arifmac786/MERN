const BlacklistToken = require('../models/blacklistToken.model');
const Captain = require('../models/captain.model');
const captainService = require('../services/captain.service');
const {validationResult} = require('express-validator')

module.exports.registerCaptain = async (req ,res , next)=>{
const errors = validationResult(req)
if(!errors.isEmpty()){
  return res.status(400).json({errors:errors.array()})
}

const { fullname,email,password,vehicle } = req.body;
const isCaptain = await Captain.findOne({email})
if(isCaptain) return res.status(400).json({message:'Captain already exist'}) 
const hashedPassword = await Captain.hashPassword(password)

const captain = await captainService.createCaptain({
  firstname:fullname.firstname,
  lastname:fullname.lastname,
  email,
  password:hashedPassword,
  color:vehicle.color,
  plate:vehicle.plate,
  capacity:vehicle.capacity,
  vehicleType:vehicle.vehicleType
})   
const token =await captain.generateAuthToken()
res.status(201).json({token , captain})
}  

module.exports.loginCaptain = async (req,res)=>{
  const errors = validationResult(req)
if(!errors.isEmpty()){
  return res.status(400).json({errors:errors.array()})
}

const {email,password} = req.body;
const captain = await Captain.findOne({email}).select('+password')
if(!captain) return res.status(401).json({
  message:"Invalid email or password"
})

const isMatch = await captain.comparePassword(password)
if(!isMatch) return res.status(401).json({message:"Invalid email or password"})

const token =await captain.generateAuthToken()
res.cookie("token",token)
res.status(200).json(
  {token,captain}
)
}

module.exports.getCaptainProfile = async (req,res)=>{
  res.status(200).json({captain : req.captain})
}

module.exports.captainLogout = async (req,res)=>{
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
 
  await BlacklistToken.create({token})
  res.clearCookie('token');


  res.status(200).json({message:'logout successfully'})
}