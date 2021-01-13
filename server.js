require('./config/db.config')
const userRoute = require('./routes/userRoute')
const express = require('express')
const app =express()
app.use(express.json())
app.use(userRoute)


app.listen(3000,()=>{
    console.log('connected')
})

// const User = require('./Models/userModel')
// User.insertMany({name:"rajesh",email:"123gmail.com"})