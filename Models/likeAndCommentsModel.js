const mongoose = require('mongoose')
const validator = require('validator') 

const lcSchema = new mongoose.Schema({
    product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products',
        required:true
    },
 
    likeCount:{
        type:Number
    },
    likeBy:[{ 
        user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    }}],
    
        

    dislikeCount:{
        type:Number
    },
    dislikeBy:[{ 
         user_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'users',
            required:true
        }
    }],
    comments:[{
        comment:{
            type:String,
        },
        user_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'users',
            required:true
        }
    }]


})


const lcModel = mongoose.model('LDC',lcSchema)

module.exports = lcModel