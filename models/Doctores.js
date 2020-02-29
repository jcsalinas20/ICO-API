const mongo = require('mongoose');
const Schema = mongo.Schema;

const docSchema = new Schema({
    nombre: {
        type: 'String',
        trim: true
    },
    username: {
        type: 'String',
        trim: true
    },
    password: {
        type: 'String',
        trim: true
    },
    consultas: [Number]
});

module.exports = mongo.model('Doctores', docSchema, 'Doctores');