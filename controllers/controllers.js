const Pacientes = require("../models/Pacientes")
const Doctores = require("../models/Doctores")

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
    Doctores.findOne({
        username: req.params.username
    }).exec(function(err, doc) {
        if (doc === null) {
            res.send("ERROR, no se encontro el Doctor.")
        } else {
            res.header("Content-Type",'application/json');
            res.send(JSON.stringify(doc, null, 2));
        }
    })
}

exports.loginPaciente = (req, res) => {
    console.log(req.params.dni)
    Pacientes.findOne({
        dni: req.params.dni,
        password: req.params.password
    }).exec(function(err, doc) {
        if (doc === null) {
            res.send("ERROR, no se encontro el Usuario.")
        } else {
            res.send("El login se realizó correctamente.")
        }
    })
}

exports.pacienteListaMed = (req, res) => {
    Pacientes.findOne({
        dni: req.params.dni,
    }).exec(function(err, doc) {
        if (doc.medicamentos.length === 0) {
            res.send("No hay ningún medicamento.")
        } else {
            res.header("Content-Type",'application/json');
            res.send(JSON.stringify(doc.medicamentos, null, 2));
        }
    })
}

exports.pacienteListaConsultas = (req, res) => {
    Pacientes.findOne({
        dni: req.params.dni,
    }).exec(function(err, doc) {
        if (doc.consultas.length === 0) {
            res.send("No hay ninguna consulta.")
        } else {
            res.header("Content-Type",'application/json');
            res.send(JSON.stringify(doc.consultas, null, 2));
        }
    })
}
