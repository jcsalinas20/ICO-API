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
const hConsultasSchema = new Schema({
    id_consulta: {
        type: Number,
        trim: true
    },
    id_paciente: {
        type: Number,
        trim: true
    },
    id_direccion: {
        type: Number,
        trim: true
    },
    doctor: {
        type: String,
        trim: true
    },
    planta: {
        type: Number,
        trim: true
    },
    sala: {
        type: Number,
        trim: true
    },
    consultas: [infoConsulta]
})

module.exports = mongo.model(
    "Historial_Consultas",
    hConsultasSchema,
    "Historial_Consultas"
)
