const UserData = require("../Models/user.model")
const {validationResult}=require('express-validator')
const jwt=require('jsonwebtoken')
const verifyJsonToken = require("../utils/verifyToken")
const fetchAllUserData=async (role)=>{
return await UserData.find({role:{$ne:role}},{email:1,_id:1,name:1})
}
const generateToken=(user)=>{
    return jwt.sign({id:user._id,email:user.email},process.env.SECRET_KEY,{expiresIn:"24h"})
}
const wheatherUserExist=async (id)=>{
const data=await UserData.findOne({_id:id})
return data
}
const signIn=async(req,res)=>{
    let user;
try{
    var {email,password}=req.query
     user=await UserData.findOne({email:email})

    if(!user){
       
        return res.status(404).json({status:false,msg:"Invalid email or Password"})}
    

}
catch(e){
    console.log(e)
    res.status(500).json({status:"false",msg:'internal server error'})
}
//compare password
try{
const isMatch=await user.comparePassword(password)
if(!isMatch)
return res.status(404).json({status:false,msg:"Invalid email or Password"})
const token=generateToken(user)

return res.status(200).json({status:true,data:{token:token,name:user?.name,role:user?.role}})

}
catch(e){
    console.log(e)
    res.status(500).json({status:"false",msg:'internal server error'})
}
}
const autoLogin=async (req,res)=>{
try{
  
    const token=req?.query?.token
  
    let tokenData=verifyJsonToken(token)
    const user=await UserData.findOne({_id:tokenData?.id})

    if(user)
    return res.status(200).json({status:true,data:{name:user?.name,email:user.email,role:user.role}})
    return res.status(404).json({status:false,msg:"token is not valid"})
}
catch(e){
   console.log(e)
    return res.status(404).json({status:false,msg:"token is not valid"})
}

}
const createUser=async(req,res)=>{
try{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json(errors)
    }
const userExit=await UserData.findOne({email:req.body.email})
if(userExit)
return res.status(404).json({status:false,data:{msg:"Email-id is already exist please try with othe email id or login"}})
const data=await UserData.create({email:req.body.email,password:req.body.password,role:'user',name:req.body.name})
let token=generateToken(data)
return res.status(200).json({status:true,data:{name:data.name,email:data.email,token:token}})
}
catch(e){
    console.log(e)
    res.status(500).json({status:false,msg:'internal server error'})
}
}
module.exports={signIn,createUser,wheatherUserExist,autoLogin,fetchAllUserData}