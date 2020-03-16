const Pacientes = require("../models/Pacientes")
const Doctores = require("../models/Doctores")
const Consultas = require("../models/Consultas")
const HistorialConsultas = require("../models/HistorialConsultas")
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
        token: req.params.token
    }).exec(async function(err, doc) {
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
            let med = []
            for (let i = 0; i < doc.medicamentos.length; i++) {
                for (let j = 0; j < doc.medicamentos[i].hora.length; j++) {
                    let medicamento = {}
                    medicamento["id"] = doc.medicamentos[i].id
                    const doc_medicamento = await Medicamentos.findOne(
                        {
                            id: doc.medicamentos[i].id
                        },
                        function (err, res) {
                            return res
                        }
                    )
                    medicamento['nombre'] = doc_medicamento.nombre
                    medicamento['imagen'] = doc_medicamento.imagen
                    const dias = {
                        lunes: doc.medicamentos[i].dias.lunes,
                        martes: doc.medicamentos[i].dias.martes,
                        miercoles: doc.medicamentos[i].dias.miercoles,
                        jueves: doc.medicamentos[i].dias.jueves,
                        viernes: doc.medicamentos[i].dias.viernes,
                        sabado: doc.medicamentos[i].dias.sabado,
                        domingo: doc.medicamentos[i].dias.domingo
                    }
                    medicamento["dias"] = dias
                    medicamento["hora"] = doc.medicamentos[i].hora[j]
                    medicamento["pastillaTomada"] = doc.medicamentos[i].pastillaTomada[j]
                    med = med.concat(medicamento)
                }
            }

            for (let i = 0; i < med.length; i++) {
                for (let j = 0; j < med.length - 1; j++) {
                    if (med[j].hora > med[j + 1].hora) {
                        let auxiliar = med[j]
                        med[j] = med[j + 1]
                        med[j + 1] = auxiliar
                    }
                }
            }

            let medicamentos = {
                medicamentos: med
            }

            res.header("Content-Type", "application/json")
            res.send(JSON.stringify(medicamentos, null, 2))
        }
    })
}

exports.pacienteListaConsultas = (req, res) => {
    Pacientes.findOne({
        token: req.params.token
    }).exec(function(err, doc_paciente) {
        if (doc_paciente == null) {
            res.header("Content-Type", "application/json")
            res.send(
                JSON.stringify(
                    {
                        respuesta: "No tienes ninguna consulta."
                    },
                    null,
                    2
                )
            )
            return
        }
        Consultas.find({
            id_paciente: doc_paciente.id_paciente
        }).exec(function(err, doc_consultas) {
            if (doc_consultas.length == 0) {
                res.header("Content-Type", "application/json")
                res.send(
                    JSON.stringify(
                        {
                            respuesta: "No tienes ninguna consulta."
                        },
                        null,
                        2
                    )
                )
                return
            }
            let consultas = {}
            for (let i = 0; i < doc_consultas.length; i++) {
                consultas[i] = doc_consultas[i].consultas
            }

            let con = []
            for (let i = 0; i < Object.keys(consultas).length; i++) {
                for (let j = 0; j < doc_consultas[i].consultas.length; j++) {
                    let consulta = {}
                    consulta["id_consulta"] = doc_consultas[i].id_consulta
                    consulta["id_doctor"] = doc_consultas[i].id_doctor
                    consulta["id_paciente"] = doc_consultas[i].id_paciente
                    consulta["id_direccion"] = doc_consultas[i].id_direccion
                    consulta["hora"] = consultas[i][j].hora
                    consulta["dia"] = consultas[i][j].dia
                    consulta["asistido"] = consultas[i][j].asistido
                    consulta["notas"] = consultas[i][j].notas
                    consulta["notas_doc"] = consultas[i][j].notas_doc
                    con = con.concat(consulta)
                }
            }

            for (let i = 0; i < con.length; i++) {
                for (let j = 0; j < con.length - 1; j++) {
                    if (con[j].dia === con[j + 1].dia) {
                        if (con[j].hora > con[j + 1].hora) {
                            let auxiliar = con[j]
                            con[j] = con[j + 1]
                            con[j + 1] = auxiliar
                        }
                    } else {
                        var dia1 = cambiarOrdenDate(con[j].dia)
                        var dia2 = cambiarOrdenDate(con[j + 1].dia)
                        if (dia1 > dia2) {
                            let auxiliar = con[j]
                            con[j] = con[j + 1]
                            con[j + 1] = auxiliar
                        }
                    }
                }
            }

            consultas = {
                consultas: con
            }
            res.header("Content-Type", "application/json")
            res.send(JSON.stringify(consultas, null, 2))
        })
    })
}

exports.pacienteListaHistorialConsultas = (req, res) => {
    Pacientes.findOne({
        token: req.params.token
    }).exec(function(err, doc_paciente) {
        if (doc_paciente == null) {
            res.header("Content-Type", "application/json")
            res.send(
                JSON.stringify(
                    {
                        respuesta: "No tienes ninguna consulta en el historial."
                    },
                    null,
                    2
                )
            )
            return
        }
        HistorialConsultas.find({
            id_paciente: doc_paciente.id_paciente
        }).exec(function(err, doc_consultas) {
            if (doc_consultas.length == 0) {
                res.header("Content-Type", "application/json")
                res.send(
                    JSON.stringify(
                        {
                            respuesta:
                                "No tienes ninguna consulta en el historial."
                        },
                        null,
                        2
                    )
                )
                return
            }
            let consultas = {}
            for (let i = 0; i < doc_consultas.length; i++) {
                consultas[i] = doc_consultas[i].consultas
            }

            let con = []
            for (let i = 0; i < Object.keys(consultas).length; i++) {
                for (let j = 0; j < doc_consultas[i].consultas.length; j++) {
                    let consulta = {}
                    consulta["id_consulta"] = doc_consultas[i].id_consulta
                    consulta["id_paciente"] = doc_consultas[i].id_paciente
                    consulta["id_direccion"] = doc_consultas[i].id_direccion
                    consulta["doctor"] = doc_consultas[i].doctor
                    consulta["hora"] = consultas[i][j].hora
                    consulta["dia"] = consultas[i][j].dia
                    consulta["asistido"] = consultas[i][j].asistido
                    consulta["notas"] = consultas[i][j].notas
                    consulta["notas_doc"] = consultas[i][j].notas_doc
                    con = con.concat(consulta)
                }
            }

            for (let i = 0; i < con.length; i++) {
                for (let j = 0; j < con.length - 1; j++) {
                    if (con[j].dia === con[j + 1].dia) {
                        if (con[j].hora < con[j + 1].hora) {
                            let auxiliar = con[j]
                            con[j] = con[j + 1]
                            con[j + 1] = auxiliar
                        }
                    } else {
                        var dia1 = cambiarOrdenDate(con[j].dia)
                        var dia2 = cambiarOrdenDate(con[j + 1].dia)
                        if (dia1 < dia2) {
                            let auxiliar = con[j]
                            con[j] = con[j + 1]
                            con[j + 1] = auxiliar
                        }
                    }
                }
            }

            consultas = {
                historial_consultas: con
            }
            res.header("Content-Type", "application/json")
            res.send(JSON.stringify(consultas, null, 2))
        })
    })
}

exports.pacientePrimerInicioSesion = (req, res) => {
    let respuesta
    Pacientes.findOne({
        token: req.params.token
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
        token: req.params.token
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
                    token: doc.token
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

exports.restartPastillas = async (req, res) => {
    let fecha = moment().format("HH:mm")
    let respuesta = {
        hora: fecha
    }
    res.header("Content-Type", "application/json")
    res.send(JSON.stringify(respuesta, null, 2))
}

function cambiarOrdenDate(str) {
    fecha = str.split("-")
    var dia = ""
    for (let i = fecha.length - 1; i >= 0; i--) {
        dia += fecha[i]
    }
    return dia
}
