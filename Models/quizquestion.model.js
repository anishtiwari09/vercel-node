const mongoose=require('mongoose')
const QuestionSchema=new mongoose.Schema({
    question_type:{
        type:String,
        require:true
    },
    question_data:{
        type:Object,
        require:true
    },
    question_no:{
        type:Number
    }

})
const Quizdata=mongoose.model("QuizQuestion",QuestionSchema,"QuizQuestion")
module.exports=Quizdata