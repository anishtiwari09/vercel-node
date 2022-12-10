const mongoose=require('mongoose')
const QuizType=new mongoose.Schema({
    test_name:{
        type:String,
        require:true
    },
    question_ids:{
        type:Array,
        require:true
    },
    user_ids:{
        type:Array,
       
    }


})
const Quizdata=mongoose.model("QuizCreate",QuizType,"Quiz")
module.exports=Quizdata