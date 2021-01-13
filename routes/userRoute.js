const express = require('express')
const router = express.Router()
const User = require('../Models/userModel')
const userController = require('../controller/userController')



router.post('/user',async (req,res)=>{
   userController.CreateUser(req.body,(error,resp)=>{
        if(error)
        {
            return res.status(500).send(''+error)
        }
        res.status(201).send(resp) 
    })   
})

router.post('/user/login',async (req,res)=>{
    userController.loginUser(req.body,(error,resp)=>{
         if(error)
         {
             return res.status(500).send(''+error)
         }
         res.status(201).send(resp) 
     })   
 })
module.exports =router