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
router.get('/products',(req,res)=>{
  ProductController.getAllProducts((error,resp)=>{
      
    if(error)
      {
          res.status(500).send(''+error)
      }
      res.status(200).send(resp)
  })
})
router.put('/products/:id',auth,async (req,res)=>{
  await ProductController.editProduct(req,(error,resp)=>{
      
    if(error)
      {
          res.status(500).send(''+error)
      }
      res.status(200).send(resp)
  })
})
router.delete('/products/:id',auth,async (req,res)=>{
  await ProductController.deleteProduct(req,(error,resp)=>{
      
    if(error)
      {
          res.status(500).send(''+error)
      }
      res.status(200).send(resp)
  })
})
router.get('/products/type/:type',async (req,res)=>{
  await ProductController.getProductByType(req,(error,resp)=>{
      
    if(error)
      {
          res.status(500).send(''+error)
      }
      res.status(200).send(resp)
  })
})
router.get('/productsRecent',async (req,res)=>{
  await ProductController.getMostRecent(req,(error,resp)=>{
      
    if(error)
      {
          res.status(500).send(''+error)
      }
      res.status(200).send(resp)
  })
})

module.exports = router