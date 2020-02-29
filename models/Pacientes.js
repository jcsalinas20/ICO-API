const mongo = require('mongoose');
const Schema = mongo.Schema;

const pacientesSchema = new Schema({
    id: {
        type: 'Number',
        trim: true
    },
    nombre: {
        type: 'String',
        trim: true
    },
    apellidos: {
        type: 'String',
        trim: true
    },
    dni: {
        type: 'String',
        trim: true
    },
    password: {
        type: 'String',
        trim: true
    },
    fecha_nacimiento: {
        type: 'String',
        trim: true
    },
    medicamentos: {
        nombre_medicamentos: {
            type: 'String',
            trim: true
        }
    },
    nombre: {
        consultas: {
            type: 'String',
            trim: true
        }
    }
});

module.exports = mongo.model('Pacientes', pacientesSchema, 'Pacientes');