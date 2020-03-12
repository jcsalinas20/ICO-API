const mongo = require("mongoose")
const Schema = mongo.Schema

// Schema general del Paciente
const medicamentosSchema = new Schema({
    id: {
        type: Number,
        trim: true
    },
    nombre: {
        type: String,
        trim: true
    },
    imagen: {
        type: String,
        trim: true
    }
})

module.exports = mongo.model("Medicamentos", medicamentosSchema, "Medicamentos")