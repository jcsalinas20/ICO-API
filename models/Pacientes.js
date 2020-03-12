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
    nombre: String,
    dias: DiasParaTomar,
    hora: Array,
    imagen: String
})

// Datos de la consulta del paciente
var DatosConsulta = new Schema({
    nombre: String,
    apellidos: String,
    hora: String,
    dia: String,
    planta: Number,
    numero_sala: Number,
    direccion: String
})

// Schema general del Paciente
const pacientesSchema = new Schema({
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
    medicamentos: [DatosMedicamento],
    consultas: [DatosConsulta]
})

module.exports = mongo.model("Pacientes", pacientesSchema, "Pacientes")
