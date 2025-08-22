const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  fullname:{
    firstname:{
      type:String,
      required:true,
      minlength:[3,"first name must be atleast 3 characters long"],
    },
    lastname:{
      type:String,
      minlength:[3,"last name must be atleast 3 characters long"],
    }
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
    select:false
  },
  socketId:{
    type:String
  }
})

 userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({_id:this._id},process.env.JWT_SECRET)
  return token;
 }
 userSchema.methods.comparePassword =async function (password){
    return await bcrypt.compare(password,this.password)
 }

 userSchema.statics.hashPassword = async function (password){
  return await bcrypt.hash(password,10)
 }

const User = mongoose.model("User",userSchema)
module.exports = User