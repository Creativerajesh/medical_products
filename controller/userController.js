const User = require('../Models/userModel')
const bcrypt = require('bcrypt')
const CreateUser=async (body,cb)=>{
    try{
        if(Object.keys(body).length <=0)
        {
       cb('To create an User Must required body',null)
        }
        const user = await new User(body)      
        await user.save()
        const token = user.generateAuthToken()
        cb(null,user)

    }catch(e){
        cb(e,null)
    }
}
const loginUser=async (body,cb)=>{
    try{
       
        if(Object.keys(body).length <=0 || !(body.email && body.password) )
        {
       cb('To Login  Email & Passeord Required',null)
        }
        const email = body.email    
        const password = body.password
        const user = await findByCredentials(email,password)
        const token = user.generateAuthToken()
        cb(null,user)

    }catch(e){
        cb(e,null)
    }
}

const findByCredentials=async (email,password)=>{
    const user = await User.findOne({ email })
    password=password.toString()
    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

module.exports ={
    CreateUser,
    loginUser
}