/********* ELIMINAR ESTO, ES SOLO DE PRUEBA *********/

const mongo = require('mongoose');
const Schema = mongo.Schema;

const usersSchema = new Schema({
    username: {
        type: 'String',
        trim: true
    },
    password: {
        type: 'String',
        trim: true
    },
    privileges: {
        type: 'String',
        trim: true
    }
});

module.exports = mongo.model('Users', usersSchema);