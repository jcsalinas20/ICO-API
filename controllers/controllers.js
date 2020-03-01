const Pacientes = require("../models/Pacientes")
const Doctores = require("../models/Doctores")
const Encriptation = require("../encrypt")

// exports.users = (req, res) => {
//     let respuesta
//     res.send("API REST")
//     const users = new Users({
//         username: req.params.username,
//         password: req.params.password,
//         privileges: "user"
//     })
//     try {
//         let resultado = users.save()
//         respuesta = {
//             mensaje: "Insertado correctamente",
//             user: resultado.password
//         }
//     } catch (error) {
//         console.log(error)
//         respuesta = {
//             error: "Error insertando"
//         }
//     }
//     res.json(respuesta)
// }

exports.getDoctor = (req, res) => {
    let respuesta
    Doctores.findOne({
        username: req.params.username
    }).exec(function(err, doc) {
        if (doc === null) {
            respuesta = {
                mensaje: "ERROR, no se encontro el Doctor."
            }
            res.header("Content-Type", "application/json")
            res.send(JSON.stringify(respuesta, null, 2))
        } else {
            res.header("Content-Type", "application/json")
            res.send(JSON.stringify(doc, null, 2))
        }
    })
}

exports.loginPaciente = (req, res) => {
    let respuesta
    Pacientes.findOne({
        dni: req.params.dni,
        password: req.params.password
    }).exec(function(err, doc) {
        if (doc === null) {
            respuesta = {
                mensaje: "ERROR, no se encontro el Usuario."
            }
        } else {
            respuesta = {
                mensaje: "El login se realizó correctamente."
            }
        }
        res.header("Content-Type", "application/json")
        res.send(JSON.stringify(respuesta, null, 2))
    })
}

exports.pacienteListaMed = (req, res) => {
    Pacientes.findOne({
        dni: req.params.dni
    }).exec(function(err, doc) {
        if (doc.medicamentos.length === 0) {
            res.send("No hay ningún medicamento.")
        } else {
            res.header("Content-Type", "application/json")
            res.send(JSON.stringify(doc.medicamentos, null, 2))
        }
    })
}

exports.pacienteListaConsultas = (req, res) => {
    Pacientes.findOne({
        dni: req.params.dni
    }).exec(function(err, doc) {
        if (doc.consultas.length === 0) {
            res.send("No hay ninguna consulta.")
        } else {
            res.header("Content-Type", "application/json")
            res.send(JSON.stringify(doc.consultas, null, 2))
        }
    })
}

exports.encrypt = (req, res) => {
    let respuesta
    var pass = Encriptation.encrypt(req.params.password)
    respuesta = {
        password: pass
    }
    res.header("Content-Type", "application/json")
    res.send(JSON.stringify(respuesta, null, 2))
}
