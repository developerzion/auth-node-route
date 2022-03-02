
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const ACCESS_TOKEN_SECRET = process.env['ACCESS_TOKEN_SECRET']

const userSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        required: true
    },
    email: {
        type: String,
        minlength: 5,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 5,
        required: true,
    }
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this.id , isAdmin : false }, ACCESS_TOKEN_SECRET)
    return token
}


module.exports = { userSchema }