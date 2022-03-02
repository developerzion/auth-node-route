const express = require("express")
const router = express.Router()
const Joi = require("joi")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


// =============== Import components ================== 
const auth = require("../auth/auth")
const { userSchema } = require("../model/user")
const User = mongoose.model("user", userSchema)
// ================== WORK ON ROUTERS ====================

router.post("/", async (req, res) => {
    const joiSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })

    const { error } = joiSchema.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const checkmail = await User.findOne({email: req.body.email})
    if(checkmail) return res.status(400).send("Email is not available")

    let salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash
    })

    try {
        await user.save()        
        return res.status(200).send(
            {"error": false,
            "message": "Registration successful"
        })        
    } catch (err) {
        res.status(400).send(err)
    }   
})


router.get("/", auth, async (req, res) => {

    const user = await User.find().select(["-_id", "-password"])
    res.status(200).send(user)
     
})
module.exports = router