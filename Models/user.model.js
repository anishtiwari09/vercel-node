const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        unique:true
    },
    role:{
        type:String,
        required:true
    }

})
UserSchema.pre('save',function(next){
   
    if(!this.isModified('password')){
        console.log('not working')
        return next()
    }
    bcrypt.hash(this.password,4,(err,hash)=>{
        if(err){
            console.log(err)
            return next(err)
        }
        this.password=hash
        console.log(this.password)
        return next()
    })
})
UserSchema.methods.comparePassword=function(password){

const hashedPassword=this.password
return bcrypt.compare(password,hashedPassword)
}
const Quizdata=mongoose.model("Users",UserSchema,"Users")
module.exports=Quizdata