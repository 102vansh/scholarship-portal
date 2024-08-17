const Student = require('../models/user.models')

const{ErrorHandler}=require('../middleware/error')

exports.register = async(req,res,next)=>{
    try{
const {name,email,password,role,department}=req.body
if(!name || !email || !password || !role ){
    return next(new ErrorHandler('Please enter all fields',400))
}
let user = await Student.findOne({email})
if(user){
    return next(new ErrorHandler('User already exists',400))
}
 user = await Student.create({
    name,
    email,
    password,
    role,
    department
 })
res.status(201).json({
    success:true,
    message:'User created successfully',
    user
})
    }catch(error){
       return next(error)
    }
}

exports.login = async(req,res,next)=>{
    try{
        const {email,password}=req.body
        if(!email || !password){
            return next(new ErrorHandler('Please enter all fields',400))
        }
        const user = await Student.findOne({email})
        if(!user){
            return next(new ErrorHandler('Invalid credentials',400))
        }
        const isMatch = await user.comparePassword(password)
        if(!isMatch){
            return next(new ErrorHandler('Invalid credentials',400))
        }

        const token = await user.getJwtToken()
        const options = {
            expires: new Date(Date.now()+90*24*60*60*1000),
            httpOnly:true
        }
        res.status(200).cookie('token',token,options).json({
            success:true,
            message:'User logged in successfully',
            user,
            token
        })
    }catch(error){
        return next(error)
    }
}
exports.logout = async(req,res,next)=>{
    try{
        res.status(200).cookie('token',null,{
            expires:new Date(Date.now()),
            httpOnly:true
        }).json({
            success:true,
            message:'User logged out successfully'
        })
    }catch(error){
        return next(error)
    }
}
exports.getallstudents = async(req,res,next)=>{
    try{
        const students = await Student.find()
        res.status(200).json({
            success:true,
            students
        })
    }catch(error){
        return next(error)
    }
}
exports.getsinglestudent = async(req,res,next)=>{
    try{
        const student = await Student.findById(req.params.id)
        res.status(200).json({
            success:true,
            student
        })
    }catch(error){
        return next(error)
    }
}

exports.getmyprofile = async(req,res,next)=>{ 
    

    try{

    
    const user = await Student.findById(req.user._id)
    if(!user){
        return next(new ErrorHandler('User not found',404))
    }
    res.status(200).json({
        success:true,
        user
    })
}catch(error){
    return next(error)
}
}
