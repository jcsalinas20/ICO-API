const mongo = require("mongoose")
const Schema = mongo.Schema

var DiasParaTomar = new Schema({
    lunes: Number,
    martes: Number,
    miercoles: Number,
    jueves: Number,
    viernes: Number,
    sabado: Number,
    domingo: Number
})

var DatosMedicamento = new Schema({
    nombre: String,
    dias: DiasParaTomar,
    hora: String,
    imagen: String
})

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
    fecha_nacimiento: {
        type: String,
        trim: true
    },
    medicamentos: [DatosMedicamento]
    // consultas: [Number]
})


module.exports = mongo.model("Pacientes", pacientesSchema, "Pacientes")