const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/client")
    .then(() => console.log("Database connected to local db ..."))
    .catch(err =>  console.error("Unable to connect to local db ...", err))