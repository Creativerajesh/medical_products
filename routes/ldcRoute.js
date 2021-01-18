const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()
const ldcController = require('../controller/ldcController')


router.post('/likeproduct/:id',auth,(req,res)=>{
    ldcController.like(req,(error,resp)=>{
        if(error)
        {
            res.status(500).send(error)
        }
        res.status(200).send(resp)
    })
})

router.post('/dislikeproduct/:id',auth,(req,res)=>{
    ldcController.dislike(req,(error,resp)=>{
        if(error)
        {
            res.status(500).send(error)
        }
        res.status(200).send(resp)
    })
})
router.post('/comment/:id',auth,(req,res)=>{
    ldcController.createComment(req,(error,resp)=>{
        if(error)
        {
            res.status(500).send(error)
        }
        res.status(200).send(resp)
    })
})
router.get('/mostliked',auth,(req,res)=>{
    ldcController.getMostlikeProduct(req,(error,resp)=>{
        if(error)
        {
            res.status(500).send(error)
        }
        res.status(200).send(resp)
    })
})

module.exports = router