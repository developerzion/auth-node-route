const express = require("express")
const router = express.Router()


module.exports =  router.post("/", (req,res)=>{ 
    res.sendStatus(204).clearCookie("auth")
})