const mongo = require('mongoose');
const Schema = mongo.Schema;

const docSchema = new Schema({
    id_doctor: {
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
    username: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    planta: {
        type: Number,
        trim: true
    },
    sala: {
        type: Number,
        trim: true
    }
});

module.exports = mongo.model('Doctores', docSchema, 'Doctores');