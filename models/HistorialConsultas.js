const mongo = require("mongoose")
const Schema = mongo.Schema

var infoConsulta = new Schema({
    id_doctor: Number,
    hora: String,
    dia: String,
    asistido: Boolean,
    notas: String,
    notas_doc: String
})

// Schema general del Paciente
const hConsultasSchema = new Schema({
    id_paciente: {
        type: Number,
        trim: true
    },
    consultas: [infoConsulta]
})

module.exports = mongo.model("Historial_Consultas", hConsultasSchema, "Historial_Consultas")