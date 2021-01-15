const mongoose = require('mongoose')
const validator = require('validator') 
const jwt=require('jsonwebtoken')
const bcrypt =require('bcrypt')
const userSchema  = new mongoose.Schema({
    name:
    {
        type:String,
        required:true,
        uppercase:true,
        trim:true
    },
    email:
    {
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        validate:{
            validator:function(email){
                        if(!validator.isEmail(email))
                        {
                            throw new Error('Email is not Valid')
                        }
            }
        }
    },
    DOB: {
        type: String,
        default: 0,
        required:true

    },
 
    gender:
    {
        type:String,
        required:true,
        lowercase:true,
        validate:{
            validator:function(gen){
                        if(!(gen=='male' || !gen=='female'))
                        {
                            throw new Error('Gender Must be Male or Female')
                        }
            }
        }
    },
    contact:{
        type:Number,
        required:true,
        minlength:10,
        maxlength:10,
        validate(value){
            const val = value.toString()
            if(!(val.length==10))
            {
                throw new Error('Contact Number Should has 10 digit')
            }
        }
    },
    password:{
        type:String,
        required:true, 
         validate(value) {
            if (value.length < 7) {
                throw new Error('Pasword Must be Greter than 7 character')
            }
         }

    },
    
    tokens:
    [{
        token:{
            type:String,
            require:true
        }
    }],
},
   

{
        timestamps: true
    
})
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id:user._id }, 'medicalproducts')

     user.tokens = user.tokens.concat({ token })
     await user.save()

    return token
}


userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password'))
    {
        user.password=await bcrypt.hash(user.password,8)

    }
    next()  
})  
const userModel = mongoose.model('users',userSchema)
module.exports = userModel