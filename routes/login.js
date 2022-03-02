
const express = require("express")
const bcrypt = require("bcrypt")
const Joi = require("joi")
const mongoose = require("mongoose")



const router = express.Router()

// =============== Import components ================== 
const { userSchema } = require("../model/user")

router.post("/", async (req, res) => {

    const joiSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })

    const { error } = joiSchema.validate(req.body)
    if(error) return res.json(
        {
            "isAuth": false,
            "msg":error.details[0].message
        })
    
    const User = mongoose.model("user", userSchema)

    const user  = await User.findOne({email: req.body.email})
    if(!user) return res.json(
        {
            "isAuth": false,
            "msg":"Invalid email address"
        })

    const isValid =  await bcrypt.compare(req.body.password, user.password)
    if (!isValid) return res.json(
        {          
            "isAuth": false,
            "msg":"Invalid password"
        })
    

    const token = user.generateAuthToken()
  
    res
    .cookie("auth", token,{
        secure: true,
        sameSite: "lax",
        httpOnly:true
    })
    .json({
            "isAuth":true,
    })

})


module.exports = router



