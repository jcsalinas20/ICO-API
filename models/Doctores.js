const mongo = require('mongoose');
const Schema = mongo.Schema;

const docSchema = new Schema({
    id: {
        type: 'Number',
        trim: true
    },
    nombre: {
        type: 'String',
        trim: true
    },
    username: {
        type: 'Number',
        trim: true
    },
    password: {
        type: 'Number',
        trim: true
    },
    consultas: {
        id_consulta: {
            type: 'Number',
            trim: true
        }
    }
});

module.exports = mongo.model('Doctores', docSchema);