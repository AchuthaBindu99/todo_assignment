const express = require("express")
const app = express()
const users = require("./routes/users")
const auth = require("./routes/auth")
const cors = require("cors")


app.use(express.json())
app.use(cors())

app.use("/api/users", users)
app.use("/api/auth", auth)

module.exports = app;
