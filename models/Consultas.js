const mongo = require("mongoose")
const Schema = mongo.Schema

// Datos del medicamento que tiene que tomar
var DatosMedicamento = new Schema({
    hora: String,
    dia: String,
    asistido: Boolean,
    notas: String,
    notas_doc: String
})

// Schema general del Paciente
const consultasSchema = new Schema({
    id_paciente: {
        type: Number,
        trim: true
    },
    nombre: {
        type: String,
        trim: true
    },
    apellidos: {
        type: String,
        trim: true
    },
    dni: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    token: {
        type: String,
        trim: true
    },
    foto: {
        type: String,
        trim: true
    },
    primerInicioSesion: {
        type: Boolean,
        trim: true
    },
    fecha_nacimiento: {
        type: String,
        trim: true
    },
    medicamentos: [DatosMedicamento]
})

module.exports = mongo.model("Consultas", consultasSchema, "Consultas")