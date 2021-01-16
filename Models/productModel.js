const mongoose = require('mongoose')
const validator = require('validator') 

const productSchema =  new mongoose.Schema({
    productName :
    {
        type:String,
        required:true,
        uppercase:true
    },
    productType:
    {
        type:String,
        required:true
      

    },
    productPrice:{
        type:Number,
        required:true
    },
    productDesc:{
        type:String,
        required:true

    },
    exp_date:
    {
        type:Date,
        required:true
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    }

},{timestamps:true})

const productModel = mongoose.model('products',productSchema)

module.exports = productModel