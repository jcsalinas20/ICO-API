const express = require("express")
require("dotenv").config()
const bodyParser = require("body-parser")
const router = require("./router")
const mongo = require("mongoose")
const app = express()

const host = process.env.HOST || "0.0.0.0"
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Credentials", true)
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
    )
    next()
})

mongo.Promise = global.Promise
mongo.connect(
    host,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    err => {
        if (err) {
            return console.log("Error al conectar con la Base de Datos.")
        }
    }
)
console.log("Conexion con la Base de Datos establecida.")

app.use("/", router())

app.listen(port, () => {
    console.log("API REST corriendo en el puerto " + port)
})
