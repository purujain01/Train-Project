const express = require("express")
require("./mongodb.js")
const router = require('./routes/train.route.js')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use('/', router)

app.listen(3000,() => {
    console.log("Server started...")
})