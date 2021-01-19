const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()

const ProductController = require('../controller/productController')

router.post('/products/:id',auth,(req,res)=>{
    ProductController.createProduct(req,(error,resp)=>{
      if(error)
      {
          return res.status(404).send(''+error)
      }
      return res.status(200).send(resp)
    })
})
router.get('/products',(req,res)=>{
  ProductController.getAllProducts((error,resp)=>{
      
    if(error)
      {
        return res.status(404).send(''+error)
      }
      return res.status(200).send(resp)
  })
})
router.patch('/products/:id',auth,async (req,res)=>{
  await ProductController.editProduct(req,(error,resp)=>{
      
    if(error)
      {
        return res.status(500).send(''+error)
      }
      return res.status(200).send(resp)
  })
})
router.delete('/products/:id',auth,async (req,res)=>{
  await ProductController.deleteProduct(req,(error,resp)=>{
      
    if(error)
      {
        return res.status(404).send(''+error)
      }
      return res.status(200).send(resp)
  })
})
router.get('/products/type/:type',async (req,res)=>{
  await ProductController.getProductByType(req,(error,resp)=>{
      
    if(error)
      {
        return res.status(404).send(''+error)
      }
      return res.status(200).send(resp)
  })
})
router.get('/productsRecent',async (req,res)=>{
  await ProductController.getMostRecent(req,(error,resp)=>{
      
    if(error)
      {
        return res.status(404).send(''+error)
      }
      return res.status(200).send(resp)
  })
})

module.exports = router