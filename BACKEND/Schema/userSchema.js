const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    Name: {type:String,required: [true, "Please enter your name "]},
    Email: {type:String,unique:[true,"Sorry this email is already taken"],required: [true, "Please add a Email"]},
    Password: {type:String,required: [true, "Your password cannot be empty"]},
    Username: {type:String,required: [true, "Please enter your Username"],unique:[true,"Username should be unique"]},
})

const UserData = mongoose.model("userdatas",UserSchema)
module.exports = UserData