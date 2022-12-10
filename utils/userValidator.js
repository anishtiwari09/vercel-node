const {body}= require('express-validator')
const userValidator=()=>([
    body('name')
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isString()
    .withMessage("Name should be string"),
    body('email')
    .isEmail()
    .withMessage('Email can not empty or valid email'),
    body('password')
    .isString()
    .withMessage("password should be string")
    .isLength({min:8})
    .withMessage("password has atleast 8 character")


])

module.exports=userValidator