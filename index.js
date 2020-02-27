const express = require("express")
require("dotenv").config()
const bodyParser = require("body-parser")
const router = require("./router")
const mongo = require("mongoose")
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

mongo.Promise = global.Promise
mongo.connect(process.env.HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use("/", router())

app.listen(3000)
