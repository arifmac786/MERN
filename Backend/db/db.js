const mongoose = require('mongoose')

const connectToDb = async ()=>{
   try{
   await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)
     console.log('db connection successful');
     
   }catch(err){
      process.exit(1)
      console.log('db connection error',err.message);
      
   }
}

module.exports = connectToDb