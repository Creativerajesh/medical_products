const mongoose = require('mongoose')
const validator = require('validator') 

const productTypeSchema = new mongoose.Schema({
    product_type :
    {
        type:String,
        trim:true,
        uppercase:true,
        required:true

    },
    user_id:
    {
          type:mongoose.Schema.Types.ObjectId,
          ref:'users',
          required:true
    }


},{timestamps:true})

const productTypeModel = mongoose.model('product_type',productTypeSchema)

module.exports = productTypeModel

