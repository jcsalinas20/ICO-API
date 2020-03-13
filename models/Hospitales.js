const mongo = require("mongoose")
const Schema = mongo.Schema

// Schema general del Paciente
const hospitalesSchema = new Schema({
    id_hospital: {
        type: Number,
        trim: true
    },
    nombre: {
        type: String,
        trim: true
    },
    direccion: {
        type: String,
        trim: true
    }
})

module.exports = mongo.model("Hospitales", hospitalesSchema, "Hospitales")