const Product_Model= require('../Models/productModel')
const pType = require('../Models/productTypeModel')
const User = require('../Models/userModel')
const mongoose = require('mongoose')
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


const getAllProducts = async(cb)=>{

    try{
        let Products =await Product_Model.find();
        if(Products.length<=0)
        {
           throw new Error('Products Not available')
        }
        for(let i=0;i<Products.length;i++)
        {
            await Products[i].populate({
                path:'user_id',
                select:'-_id -DOB -gender -password -tokens -__v -createdAt -updatedAt'
            }).execPopulate();
        }
        cb(null,Products)
          
    }catch(e){
        cb(e,null)
    }
    
}


const editProduct = async(req,cb)=>{
    try{
    if(Object.keys(req.body).length <=0)
    {
        throw new Error('You have passed Nothing to Update')
    }
    const pid = req.params.id;
    const product = await Product_Model.findById(pid)
   
    const isOwner=req.user._id.equals(product.user_id)
    if(!isOwner)
    {
        
        throw new Error('You can not Edit Because You Did Not Create it')
    }
  
    const uProduct =await Product_Model.findByIdAndUpdate(pid,req.body)
         cb(null,uProduct)
   
}catch(e){
    cb(e,null)
}
}
const deleteProduct = async (req,cb)=>{
    try{
     const pid = req.params.id;
     const product = await Product_Model.findById(pid)
     const isOwner=req.user._id.equals(product.user_id)
     if(!isOwner)
     {
         
         throw new Error('You can not delete this Product Because You Did Not Create it')
     }
   
     const dProduct =await Product_Model.findByIdAndDelete(pid)
     cb(null,dProduct)
    }
    catch(e){
        cb(e,null)
    }
}


const getProductByType = async(req,cb)=>{
    try{
    const type = req.params.type.toUpperCase()
    if(!type)
    {
        throw new Error('Type cannot be empty')
    }
    const products = await Product_Model.find({productType:type})
    cb(null,products)
  }catch(e){
      cb(e,null)
  }
}

const getMostRecent = async (req,cb)=>{
    try{
            const product =await  Product_Model.find(null,null,{limit:1,sort:{createdAt:-1}})
          
            cb(null,product)
    }catch(e){
        cb(e,null)
    }
}
module.exports = {
    createProduct,getAllProducts,
    editProduct,deleteProduct,getProductByType,getMostRecent
    
}