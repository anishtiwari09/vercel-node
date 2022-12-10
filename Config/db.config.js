const mongoose=require('mongoose')
const db_name="Quiz-Page"
const connect =()=>new mongoose.connect(`mongodb+srv://Anish:${process.env.PASS}@cluster0.gsbhutr.mongodb.net/${db_name}?retryWrites=true&w=majority`)

module.exports=connect