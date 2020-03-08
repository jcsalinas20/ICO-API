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
    }).exec(function (err, doc) {
        if (doc === null) {
            respuesta = {
                mensaje: "ERROR, no se encontró el Doctor."
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
    var passEncriptada = Encriptation.encrypt(req.params.password)
    Pacientes.findOne({
        dni: req.params.dni,
        password: passEncriptada
    }).exec(function (err, doc) {
        if (doc === null) {
            respuesta = {
                mensaje: "ERROR, no se encontró el Usuario."
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

exports.pacienteListaMedicinas = (req, res) => {
    Pacientes.findOne({
        dni: req.params.dni
    }).exec(function (err, doc) {
        if (doc === null) {
            respuesta = {
                mensaje: 'ERROR, no se encontró el Usuario'
            }
            res.header("Content-Type", "application/json")
            res.send(JSON.stringify(respuesta, null, 2))
        } else if (doc.medicamentos.length === 0) {
            respuesta = {
                mensaje: 'No hay ningún medicamento'
            }
            res.header("Content-Type", "application/json")
            res.send(JSON.stringify(respuesta, null, 2))
        } else {
            res.header("Content-Type", "application/json")
            res.send(JSON.stringify(doc.medicamentos, null, 2))
        }
    })
}

exports.pacienteListaConsultas = (req, res) => {
    let respuesta
    Pacientes.findOne({
        dni: req.params.dni
    }).exec(function (err, doc) {
        if (doc === null) {
            respuesta = {
                mensaje: 'ERROR, no se encontró el Usuario'
            }
            res.header("Content-Type", "application/json")
            res.send(JSON.stringify(respuesta, null, 2))
        } else if (doc.consultas.length === 0) {
            respuesta = {
                mensaje: 'No hay ninguna consulta'
            }
            res.header("Content-Type", "application/json")
            res.send(JSON.stringify(respuesta, null, 2))
        } else {
            res.header("Content-Type", "application/json")
            res.send(JSON.stringify(doc.consultas, null, 2))
        }
    })
}

exports.pacientePrimerInicioSesion = (req, res) => {
    let respuesta
    Pacientes.findOne({
        dni: req.params.dni
    }).exec(function (err, doc) {
        if (doc === null) {
            respuesta = {
                mensaje: 'ERROR, no se encontró el Usuario'
            }
            res.header("Content-Type", "application/json")
            res.send(JSON.stringify(respuesta, null, 2))
        } else {
            res.header("Content-Type", "application/json")
            res.send(JSON.stringify(doc.primerInicioSesion, null, 2))
        }
    })
}

exports.pacienteCambioPassword = (req, res) => {
    let respuesta
    let passEncriptada = Encriptation.encrypt(req.params.password)
    Pacientes.findOne({
        dni: req.params.dni
    }).exec(function (err, doc) {
        if (doc === null) {
            respuesta = {
                mensaje: 'ERROR, no se encontró el Usuario'
            }
            res.header("Content-Type", "application/json")
            res.send(JSON.stringify(respuesta, null, 2))
        } else {
            Pacientes.updateOne({
                dni: doc.dni
            }, {
                password: passEncriptada,
                primerInicioSesion: false
            }, {
                new: true
            }, (err, raw) => {
                if (err) {
                    respuesta = {
                        mensaje: 'No se ha podido actualizar la contraseña'
                    }
                }
                respuesta = {
                    mensaje: 'Se ha actualizar la contraseña correctamente.'
                }
                res.header("Content-Type", "application/json")
                res.send(JSON.stringify(respuesta, null, 2))
            })
        }
    })
}