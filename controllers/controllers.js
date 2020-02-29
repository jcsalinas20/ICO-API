const Users = require("../models/Users")
const Pacientes = require("../models/Pacientes")
const Doctores = require("../models/Doctores")
const Medicamentos = require("../models/Medicamentos")
const Consultas = require("../models/Consultas")
const Encrypt = require("../encrypt")

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
    console.log(req.params.username)
    Doctores.findOne({
        username: req.params.username
    }).exec(function(err, doc) {
        if (doc === null) {
            res.send("ERROR, no se encontro el Doctor.")
        } else {
            res.json(doc)
        }
    })
}
