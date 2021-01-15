const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()

const ProductController = require('../controller/productController')

router.get('/products/:id',auth,(req,res)=>{
    ProductController.createProduct(req,(error,resp)=>{
      if(error)
      {
          res.status(500).send(''+error)
      }
      res.status(200).send(resp)
    })
})

module.exports = router