

const express = require("express")
const auth = require("../auth/auth")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const ACCESS_TOKEN_SECRET = process.env['ACCESS_TOKEN_SECRET']


const router = express.Router()


router.get("/",auth, (req, res) => {

    const id = req.user._id
    const isAdmin = req.user.isAdmin

    
    res.send({"isAuth":true, id, isAdmin})

})

module.exports = router