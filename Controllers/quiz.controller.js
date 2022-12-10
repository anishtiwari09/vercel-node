const Quiz = require("../Models/quiz.model")
const getQuizTest=async(req,res)=>{
try{
const data=await Quiz.find({},{__v:0,question_ids:0,user_ids:0  })
return res.status(201).json({status:true,data})
}
catch(e){
    console.log(e)
    return  res.status(500).json({msg:'internal server error'})
}
}
const updateQuizDetails=async(req,res)=>{
try{
let data=await Quiz.findOne({test_name:req?.query?.quizId,"user_ids.userId":req?.userData?.id},{"user_ids.$":1  })
if(!data)
return res.status(404).json({status:false,msg:"Invalid authorization"})
if(data[0]?.quizCompleted){
    return res.status(200).json({status:true,msg:"Quiz Completed"})
}
data=data?.user_ids
if(data[0]?.currentQuestion===10||data[0]?.currentLevel==10||(data[0]?.currentLevel===1&&req.query.isCorrect=="false")){
console.log('working')
await Quiz.findOneAndUpdate({test_name:req?.query?.quizId,"user_ids.userId":req?.userData?.id},{$set:{
    "user_ids.$.quizCompleted":true
}})
console.log('false')
return res.status(200).json({status:true,msg:"Quiz Completed"})
}
let addValue=5;
let level=1
if(req.query?.isCorrect=="false"){
addValue=-2
level=-1
}
 data =await Quiz.findOneAndUpdate({test_name:req?.query?.quizId,"user_ids.userId":req?.userData?.id},{$inc:{
    "user_ids.$.currentQuestion":1,"user_ids.$.score":addValue,"user_ids.$.currentLevel":level,"user_ids.$.attempt":1
}})
return res.status(200).json({status:true,msg:"Quiz Is IN progress"})
}

catch(e){
    console.log(e)
    return  res.status(500).json({msg:'internal server error'})
}
}
const createQuizTest=async(req,res)=>{
try{
    console.log('createQuiz')
const isQuizExit=await Quiz.findOne({test_name:req?.body?.quizId})
console.log(isQuizExit)
if(isQuizExit)
return res.status(404).json({status:false,msg:'Quiz already exist please choose other quiz id'})
let allUsersId=req?.body?.allUsersId||[]
allUsersId=allUsersId?.map((item)=>{
   let obj= {
        userId:item,
        currentQuestion:1,
        attempt:0,
        score:0,
        quizCompleted:false,
        currentLevel:5

    }
    return obj
})
if(!req?.body?.quizId||allUsersId?.length<1||req?.body?.questionIds<1)
return res.status(404).json({status:false,msg:"mandatory quizId , users and question"})

const data=await Quiz.create({
    test_name:req?.body?.quizId,
    user_ids:allUsersId,
    question_ids:req?.body?.questionIds
})
console.log(data)
if(!data)
res.status(404).json({msg:'please quiz_id, user_ids and question_id are required'})
return res.status(200).json({msg:"success",data})
}
catch(e){
    console.log(e)
    res.status(500).json({msg:'internal server error'})
}
}
const getAssignedQuiz=async(req,res,next)=>{
try{
  
    const quiz=await Quiz.findOne({test_name:req.query.quizId,"user_ids.userId":req?.userData?.id},{"user_ids.$":1,question_ids:1})
if(!quiz)
return res.status(404).json({status:false,tokenValid:true,msg:"invalid Quiz Id"})
if(quiz?.user_ids[0]?.quizCompleted){
return res.status(201).json({status:true,quizDetails:quiz?.user_ids[0],quizCompleted:true,questionData:{}})

}
req.quiz={questionId:quiz?.question_ids[quiz?.user_ids[0]?.currentQuestion-1],quizDetails:quiz?.user_ids[0]}
return next()
}
catch(e){
    console.log(e)
    return res.status(500).json({status:false,tokenValid:false,msg:"internal server error"})
}
}
module.exports={getQuizTest,createQuizTest,getAssignedQuiz,updateQuizDetails}