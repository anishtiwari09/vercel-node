const jwt=require('jsonwebtoken')

const verifyJsonToken=(token)=>{
return jwt.verify(token,process.env.SECRET_KEY)
}
module.exports=verifyJsonToken