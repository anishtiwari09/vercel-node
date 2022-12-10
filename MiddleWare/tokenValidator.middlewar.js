const { wheatherUserExist } = require("../Controllers/User.controller");
const Quizdata = require("../Models/quiz.model");
const verifyJsonToken = require("../utils/verifyToken");

const userTokenValidatorMiddleWare=async(req,res,next)=>{
try{
const { headers}=req
const bearerToken=headers?.authorization?.split("Bearer ")[1]
let data;
if(bearerToken){
data=verifyJsonToken(bearerToken)
if(!data){
    return res.status(404).json({status:false,tokenValid:false,msg:"invalid authorization"})
}
let currentUser=await wheatherUserExist(data?.id)

if(!currentUser){
    return res.status(404).json({status:false,tokenValid:false,msg:"invalid token"})
}

req.userData=data
return next()

}
}
catch(e){
    console.log(e,'invalid')
    return res.status(404).json({status:false,tokenValid:true,msg:"invalid authorization"})
  
}
}
const adminTokenValidatorMiddleWare=async(req,res,next)=>{
try{
const { headers}=req
const bearerToken=headers?.authorization?.split("Bearer ")[1]

let data;
if(bearerToken){
data=verifyJsonToken(bearerToken)
if(!data){
    return res.status(404).json({status:false,tokenValid:false,msg:"invalid authorization"})
}
let currentUser=await wheatherUserExist(data?.id)

if(!currentUser){
    return res.status(404).json({status:false,tokenValid:false,msg:"invalid token"})
}
if(currentUser?.role!=="admin"){
    return res.status(404).json({status:false,tokenValid:true,msg:"Your not authorized to access this data"})
}
req.userData=data
return next()

}
}
catch(e){
    console.log(e)
    return res.status(404).json({status:false,tokenValid:true,msg:"invalid authorization"})
  
}
}

module.exports={adminTokenValidatorMiddleWare,userTokenValidatorMiddleWare}