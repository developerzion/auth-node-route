const express = require("express")
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")

//Import components
require("./model/db")
const router = require("./routes/users")
const auth = require("./routes/login")
const profile = require("./routes/profile")
const logout = require("./routes/logout")


app.use(express.json())
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3001',
    credentials: true
}))

app.use(cookieParser()) 
app.use(bodyParser.json())
app.use("/api/users", router)
app.use("/api/login", auth)
app.use("/api/profile", profile)
app.use("/api/logout", logout)



const port = 3000 || process.env.port
app.listen(port, console.log(`App listening on port ${port}`))