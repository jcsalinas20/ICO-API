const Pacientes = require("../models/Pacientes")
const Doctores = require("../models/Doctores")
const Consultas = require("../models/Consultas")
const Medicamentos = require("../models/Medicamentos")
const Hospitales = require("../models/Hospitales")
const Encriptation = require("../services/Encrypt")
const Token = require("../services/Token")
const moment = require("moment")

exports.getDoctor = (req, res) => {
    let respuesta
    Doctores.findOne({
        username: req.params.username
    }).exec(function(err, doc) {
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
    }).exec(async function(err, doc) {
        if (doc === null) {
            respuesta = {
                mensaje: "ERROR, no se encontró el Usuario."
            }
        } else {
            const tokenHash = await Token.create(doc)
            respuesta = {
                mensaje: "El login se realizó correctamente.",
                token: `${tokenHash}`
            }
        }
        res.header("Content-Type", "application/json")
        res.send(JSON.stringify(respuesta, null, 2))
    })
}

exports.pacienteListaMedicinas = (req, res) => {
    Pacientes.findOne({
        dni: req.params.dni
    }).exec(function(err, doc) {
        if (doc === null) {
            respuesta = {
                mensaje: "ERROR, no se encontró el Usuario"
            }
            res.header("Content-Type", "application/json")
            res.send(JSON.stringify(respuesta, null, 2))
        } else if (doc.medicamentos.length === 0) {
            respuesta = {
                mensaje: "No hay ningún medicamento"
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
    Pacientes.findOne({
        token: req.params.token
    }).exec(function(err, doc_paciente) {
        Consultas.find({
            id_paciente: doc_paciente.id_paciente
        }).exec(function(err, doc_consultas) {
            let consultas = {}
            for (let i = 0; i < doc_consultas.length; i++) {
                consultas[i] = doc_consultas[i].consultas
            }

            let con = consultas[0]
            for (let i = 1; i < Object.keys(consultas).length; i++) {
                con = con.concat(consultas[i])
            }

            console.log(con)
            for (let i = 0; i < con.length; i++) {
                for (let j = 0; j < con.length - 1; j++) {
                    // console.log(con[i].dia + " - " + con[j + 1].dia)
                    if (con[j].dia === con[j + 1].dia) {
                        console.log("igual ("+con[i].dia + " - " + con[j + 1].dia+")")
                    } else {
                        if (con[j].dia > con[j + 1].dia) {
                            let auxiliar = con[j]
                            con[j] = con[j + 1]
                            con[j + 1] = auxiliar
                            console.log("<= mas grande ("+con[i].dia + " - " + con[j + 1].dia+")")
                        } else {
                            console.log("mas grande => ("+con[i].dia + " - " + con[j + 1].dia+")")
                        }
                    }
                }
            }
            console.log('-----------------------------------------')
            console.log(con)
            res.header("Content-Type", "application/json")
            res.send(JSON.stringify(con, null, 2))
        })
    })
}

exports.pacientePrimerInicioSesion = (req, res) => {
    let respuesta
    Pacientes.findOne({
        dni: req.params.dni
    }).exec(function(err, doc) {
        if (doc === null) {
            respuesta = false
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
    }).exec(function(err, doc) {
        if (doc === null) {
            respuesta = {
                mensaje: "ERROR, no se encontró el Usuario"
            }
            res.header("Content-Type", "application/json")
            res.send(JSON.stringify(respuesta, null, 2))
        } else {
            Pacientes.updateOne(
                {
                    dni: doc.dni
                },
                {
                    password: passEncriptada,
                    primerInicioSesion: false
                },
                {
                    new: true
                },
                (err, raw) => {
                    if (err) {
                        respuesta = {
                            mensaje: "No se ha podido actualizar la contraseña"
                        }
                    }
                    respuesta = {
                        mensaje: "Se ha actualizar la contraseña correctamente."
                    }
                    res.header("Content-Type", "application/json")
                    res.send(JSON.stringify(respuesta, null, 2))
                }
            )
        }
    })
}

exports.vaidacionToken = async (req, res) => {
    // let fecha = moment().format('DD-HH:mm:ss')
    let fecha = moment().format("HH:mm:ss")
    let respuesta = {
        hora: fecha
    }
    res.header("Content-Type", "application/json")
    res.send(JSON.stringify(respuesta, null, 2))
}
