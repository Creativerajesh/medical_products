const LDC = require('../Models/likeAndCommentsModel')
const productModel = require('../Models/productModel')

const mongoose = require('mongoose')



const like = async(req,cb)=>{
    try{
    const pid = req.params.id
    const product = await productModel.findById(pid)
    if(!product)
    {
        return cb('Product Not found',null)
    }
    const prod = await LDC.find({product_id:mongoose.Types.ObjectId(pid)})
   
    if(prod.length<=0)
    {
        
        const data = {
            product_id:pid,
            likeCount:1,
            dislikeCount:0,
            likeBy:[{user_id:req.user._id}]
        }
            
          
        const newData = await new LDC(data)
        newData.save()
        return cb(null,'You have SuccessFully Liked this Post')
        
        }else
        {  
            const isUserLiked = prod[0].likeBy.findIndex((el)=>el.user_id.equals(req.user._id));
            if(isUserLiked==-1)
            {
                prod[0].likeBy.push({user_id:req.user._id})
                prod[0].likeCount +=1;
                await prod[0].save()
                //Remove Dislike If availablie
                const index = prod[0].dislikeBy.findIndex((el)=>el.user_id.equals(req.user._id));
                if(index>=0)
                {
                    prod[0].dislikeBy.splice(index,1)
                    prod[0].dislikeCount -=1;
                    await prod[0].save();     
                }
                return cb(null,'You have Successfully Liked This Post')
            }
            else{
            let index=prod[0].likeBy.findIndex((el)=>el.user_id.equals(req.user._id));
            prod[0].likeBy.splice(index,1)
            prod[0].likeCount -=1;
            await prod[0].save();     
            return cb(null,'Your Like has Removed  Successfully')
           }     
        }
    }catch(e){
      
        cb(e,null)
    }
        
}
        
const dislike = async (req,cb)=>{
try{
    // Check the Product Available or Not in Product Model
    const pid = req.params.id
    const product = await productModel.findById(pid)
    if(!product)
    {
        return cb('Product Not found',null)        
    }
    //check product available in Like Model
    const prod = await LDC.find({product_id:mongoose.Types.ObjectId(pid)})
    if(prod.length<=0)
    {      
        const data = {
            product_id:pid,
            dislikeCount:1,
            likeCount:0,
            dislikeBy:[{user_id:req.user._id}]
        }
            
          
        const newData = await new LDC(data)
        newData.save()
        cb(null,'You have SuccessFully DisLiked this Post')
        
        }
        else
        {
            //Check is User Already Disliked The Product
            const isUserDisLiked = prod[0].dislikeBy.findIndex((el)=>el.user_id.equals(req.user._id));
            if(isUserDisLiked==-1)
            {
                prod[0].dislikeBy.push({user_id:req.user._id})
                prod[0].dislikeCount +=1;
                await prod[0].save()
                //Remove Like From Like by
                let index=prod[0].likeBy.findIndex((el)=>el.user_id.equals(req.user._id));
                if(index>=0){
                prod[0].likeBy.splice(index,1)
                prod[0].likeCount -=1;
                await prod[0].save();        
                }       
                return cb(null,'You have Successfully DisLiked This Post')
            }
            else
            {
                    //Remove Dislike From Collection
                    let index=prod[0].dislikeBy.findIndex((el)=>el.user_id.equals(req.user._id));
                    prod[0].dislikeBy.splice(index,1)
                    prod[0].dislikeCount -=1;
                    await prod[0].save();    
                    return cb(null,'Your Dislike Has Been Removed ')
            }


        }
}   
catch(e){
    console.log(e)
    return cb(e+'server Error',null)
}

}
const createComment = async(req,cb)=>{
try{
// Check the Product Available or Not in Product Model
    const pid = req.params.id
    const ucomment = req.body.comment
    if(!ucomment)
    {
        return cb('Comment Must be passed',null)
    }
    const product = await productModel.findById(pid)
    if(!product)
    {
        return cb('Product Not found',null)       
    }
     //check product available in Like Model
     const prod = await LDC.find({product_id:mongoose.Types.ObjectId(pid)})
     if(prod.length<=0)
     {      
         const data = {
             product_id:pid,
             dislikeCount:0,
             likeCount:0,
             comments:[{comment:ucomment,user_id:req.user._id}]
         }
             
           
         const newData = await new LDC(data)
         newData.save()
         return cb(null,'Your Comment has benn added ')
    }else
    {
        //Add a New Comment
        prod[0].comments.push({comment:ucomment,user_id:req.user._id})
        prod[0].save()
        return cb(null,'Your Comment has benn added ')
    }

    
}catch(e)
{
  
    return cb(e+'Server Error',null)
}
}
const getMostlikeProduct = async (req,cb)=>{
    try{
        let Products =await productModel.find();
        if(Products.length<=0)
        {
           return cb('Products Not available',null)
        }
        const product =await  LDC.find({},{comments:0,likeBy:0,dislikeBy:0,__v:0}).sort({likeCount:-1})
        for(let i=0;i<product.length;i++)
        {
            await product[i].populate({
                path:'product_id',
               
                select:'-_id -updatedAt -likeBy -dislikeBy -user_id -createdAt -__v  '
                
            }).execPopulate();
        }
       return  cb(null,product)
          
    }catch(e){
        console.log(e)
        cb(e+'Server Error',null)
    }
    
}
module.exports ={
    like,dislike,createComment,getMostlikeProduct
}