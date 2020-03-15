const mongo = require("mongoose")
const Schema = mongo.Schema

var infoConsulta = new Schema({
    hora: String,
    dia: String,
    asistido: Boolean,
    notas: String,
    notas_doc: String
})

// Schema general del Paciente
const consultasSchema = new Schema({
    id_consulta: {
        type: Number,
        trim: true
    },
    id_doctor: {
        type: Number,
        trim: true
    },
    id_paciente: {
        type: Number,
        trim: true
    },
    consultas: [infoConsulta]
})

module.exports = mongo.model("Consultas", consultasSchema, "Consultas")