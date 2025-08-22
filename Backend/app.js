require("dotenv").config()
const express = require('express')
const app = express()
const cors = require('cors')
const connectToDb = require('./db/db')
const userRoutes = require("./routes/user.route")

connectToDb()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get('/',(req,res)=>{
  res.send('hello world!')
})

app.use('/users',userRoutes)

module.exports = app