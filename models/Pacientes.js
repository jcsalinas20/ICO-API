const mongo = require("mongoose")
const Schema = mongo.Schema

// Datos de los dias que tiene que tomar las pastillas
var DiasParaTomar = new Schema({
    lunes: Number,
    martes: Number,
    miercoles: Number,
    jueves: Number,
    viernes: Number,
    sabado: Number,
    domingo: Number
})

// Datos del medicamento que tiene que tomar
var DatosMedicamento = new Schema({
    dias: DiasParaTomar,
    hora: Array,
    id: Number,
    pastillaTomada: Array
})

// Schema general del Paciente
const pacientesSchema = new Schema({
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
    expireToken: {
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
    genero: {
        type: String,
        trim: true
    },
    medicamentos: [DatosMedicamento]
})

module.exports = mongo.model("Pacientes", pacientesSchema, "Pacientes")
