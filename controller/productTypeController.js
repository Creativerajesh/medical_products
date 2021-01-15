const pType = require('../Models/productTypeModel')

const CreatePType = async (req,cb)=>{
    try{
        
        if(Object.keys(req.body).length <=0 || !(req.body.producttype))
        {
       cb('To create a Product Type Product Type is required',null)
        }
        const typeData ={
            product_type:req.body.producttype,
            user_id:req.user._id
        }
        const newptype = await new pType(typeData)      
        await newptype.save()
        cb(null,newptype)

    }catch(e){
        
        
        cb(e,null)
       
    }
}

const getPtype = async (cb)=>{
    try{
        const data = await  pType.find()    
        if(!data)
        {
            cb('No type Found',null)
        }
        cb(null,data)

    }catch(e)  {
        cb(e,null) 
    }
}


module.exports = {
    CreatePType,getPtype

}