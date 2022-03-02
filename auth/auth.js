const jwt = require("jsonwebtoken")
require("dotenv").config()

const ACCESS_TOKEN_SECRET = process.env['ACCESS_TOKEN_SECRET']

module.exports = async function auth(req, res, next){

    const token = req.cookies.auth
    if(!token) return res.send({"isAuth":false, "msg":"Authorized... No header request found"})

    try {

        const decode = jwt.verify(token, ACCESS_TOKEN_SECRET)
        req.user = decode
        next()
        
    } catch (err) {
        res.status(403).send("Forbidden")
    }


}