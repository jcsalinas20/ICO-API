"use strict"
const fetch = require("node-fetch");
const Pacientes = require('../models/Pacientes')

module.exports = {
    validacionToken: function () {
        comprobarHora()
    }
}

var comprobarHora = function call() {
    fetch('https://api-ico.herokuapp.com/api/vaidacionToken')
        .then(function (res) {
            return res.json();
        })
        .then(async function (myJson) {
            console.log(myJson.hora)
            if (myJson.hora === '00:00:01') {
                deleteToken()
            }
            await sleep(1000)
            comprobarHora()
        });
}

function deleteToken() {
    Pacientes.updateMany({}, {
        token: 'null'
    }, {
        new: true
    }, (err, raw) => {
        if (err) {
            console.log('No se ha podido eliminar el token')
        } else {
            console.log('Tokens eliminados.')
        }
    })
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}