const Product_Model= require('../Models/productModel')
const pType = require('../Models/productTypeModel')

const createProduct = async (req,cb)=>{
    const ptype_id = req.params.id

    if(!ptype_id)
    {
        cb('Product Type ID must needed',null)
    }
    const type = await pType.findById(ptype_id)
    const Ptype =type.product_type
    try{
        
        if(Object.keys(req.body).length <=0)
        {
       cb('To create a Product body is required',null)
        }
        const data = req.body;
        data.user_id=req.user._id
        data.productType=Ptype
        const newData =new Product_Model(data)
        await newData.save()
        cb(null,newData)

    }catch(e){
        
        console.log(e)
        cb(e,null)
       
    }

}

module.exports = {
    createProduct
}