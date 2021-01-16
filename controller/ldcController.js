const LDC = require('../Models/likeAndCommentsModel')
const productModel = require('../Models/productModel')

const mongoose = require('mongoose')



const like = async(req,cb)=>{
    const pid = req.params.id
    const product = await productModel.findById(pid)
    if(!product)
    {
        throw new Error('Product Not found')
    }
    const prod = await LDC.find({product_id:mongoose.Types.ObjectId(pid)})
   
    if(prod.length<=0)
    {
        console.log('hhhh')
        const data = {
            product_id:pid,
            likeCount:1,
            likeBy:[{user_id:req.user._id}]
        }
            
          
        const newData = await new LDC(data)
        newData.save()
        
        }
      console.log(prod)
      // to check
      
}
        
 

module.exports ={
    like
}