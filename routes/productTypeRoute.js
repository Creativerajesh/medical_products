const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()
const ProductType= require('../Models/productTypeModel')
const pTypeController = require('../controller/productTypeController')


router.post('/producttype',auth,async (req,res)=>{

    pTypeController.CreatePType(req,(error,resp)=>{
        if(error)
        {
            return res.status(500).send(''+error)
        }
        return res.status(201).send(resp) 
    })   
 
})

router.get('/producttype',auth,(req,res)=>{
    pTypeController.getPtype((error,resp)=>{
        if(error)
        {
            return res.status(404).send(''+error)
        }
        return res.status(200).send(resp)
    })
})

module.exports = router
