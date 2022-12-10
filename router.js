const express=require('express')
const { createQuizTest,getQuizTest, getAssignedQuiz, updateQuizDetails } = require('./Controllers/quiz.controller')
const { getQuizQuestion, fetchAllQuizQuestion } = require('./Controllers/QuizQuestion.controller')
const { createUser, signIn,autoLogin, wheatherUserExist, fetchAllUserData } = require('./Controllers/User.controller')
const {  adminTokenValidatorMiddleWare, userTokenValidatorMiddleWare } = require('./MiddleWare/tokenValidator.middlewar')
const userValidator = require('./utils/userValidator')
const router=express.Router()
router.get('/quizquestion',userTokenValidatorMiddleWare,getAssignedQuiz,getQuizQuestion)
router.post('/createUser',...userValidator(),createUser)
router.get('/signIn',signIn)
router.get('/autoLogin',autoLogin)
router.get('/getQuizDetails',adminTokenValidatorMiddleWare,async(req,res)=>{
try{

    let allUserData=await fetchAllUserData('admin')
    let questionBanks=await fetchAllQuizQuestion()
   return res.status(201).json({status:true,tokenValid:true,userData:allUserData,questionBanks:questionBanks})
    
}
catch(e){
    console.log(e)
    return res.status(500).json({status:false,tokenValid:true,msg:"something went wrong"})
}
})
router.post("/createNewQuiz",adminTokenValidatorMiddleWare,createQuizTest)
router.get("/getAllQuizData",adminTokenValidatorMiddleWare,getQuizTest)
router.get("/updateQuizDetails",userTokenValidatorMiddleWare,updateQuizDetails)
module.exports=router