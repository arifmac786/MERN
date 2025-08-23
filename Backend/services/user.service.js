const User = require('../models/user.model')

module.exports.createUser = async ({
  firstname,lastname,email,password
})=>{
  if(!firstname || !email || !password){
    throw new Error('All fields are required')
  }

  const user =await User.create({
    fullname:{
      firstname,lastname
    },
    email,
    W
  })

  return user

}