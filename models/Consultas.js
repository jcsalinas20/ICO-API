const mongo = require('mongoose');
const Schema = mongo.Schema;

const consultasSchema = new Schema({
    id: {
        type: 'Number',
        trim: true
    },
    id_doctor: {
        type: 'Number',
        trim: true
    },
    id_paciente: {
        type: 'Number',
        trim: true
    },
    hora: {
        type: 'String',
        trim: true
    },
    direccion: {
        type: 'String',
        trim: true
    },
    dia: {
        type: 'String',
        trim: true
    },
    numero_sala: {
        type: 'Number',
        trim: true
    },
});

module.exports = mongo.model('Consultas', consultasSchema);