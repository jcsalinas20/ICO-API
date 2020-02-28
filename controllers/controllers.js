const Users = require("../models/Users")
const Pacientes = require("../models/Pacientes")
const Doctores = require("../models/Doctores")
const Medicamentos = require("../models/Medicamentos")
const Consultas = require("../models/Consultas")
const Users = require("../models/Users")
const Encrypt = require("../encrypt")

exports.users = (req, res) => {
    let respuesta
    res.send("API REST")
    const users = new Users({
        username: req.params.username,
        password: req.params.password,
        privileges: "user"
    })
    try {
        let resultado = users.save()
        respuesta = {
            mensaje: "Insertado correctamente",
            user: resultado.password
        }
    } catch (error) {
        console.log(error)
        respuesta = {
            error: "Error insertando"
        }
    }
    res.json(respuesta)
}

exports.doctores = (req, res) => {
    let passEncriptada = Encrypt.encrypt(req.params.password)
    Users.findOne({
        username: req.params.username,
        password: passEncriptada
    }).exec(function(err, doc) {
        if (doc === null) {
            res.send("ERROR NO SE ENCONTRO EL USER.")
        } else {
            res.json(doc)
        }
    })
}
