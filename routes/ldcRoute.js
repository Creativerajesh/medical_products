const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()
const ldcController = require('../controller/ldcController')


router.post('/likeproduct/:id',auth,(req,res)=>{
    ldcController.like(req,(e,r)=>{
        res.send('f')
    })
})

module.exports = router