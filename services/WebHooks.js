"use strict"
const fetch = require("node-fetch")
const Pacientes = require("../models/Pacientes")
const moment = require("moment")

module.exports = {
    validacionToken: function() {
        comprobarHoraToken()
    },
    restartPastillas: function() {
        comprobarHoraPastillas()
    }
}

var comprobarHoraPastillas = function call() {
    fetch("https://ico-project-api.herokuapp.com/api/restartPastillas")
        .then(function(res) {
            return res.json()
        })
        .then(async function(myJson) {
            if (myJson.hora === "00:01") {
                restartPastillas()
            }
            await sleep(60000)
            comprobarHoraPastillas()
        })
        .catch(function() {
            console.log("Error WebHook Pastillas")
        })
}

var comprobarHoraToken = function call() {
    fetch("https://ico-project-api.herokuapp.com/api/vaidacionToken")
        .then(function(res) {
            return res.json()
        })
        .then(async function(myJson) {
            for (let i = 0; i < myJson.expireToken.length; i++) {
                if (myJson.expireToken[i].date === getMomentNow()) {
                    deleteToken(myJson.expireToken[i].dni)
                }
            }
            await sleep(3600000)
            comprobarHoraToken()
        })
        .catch(function() {
            console.log("Error WebHook Tokens")
        })
}

function getMomentNow() {
    return moment().format("DD-MM-YYYY:HH")
}

function deleteToken(dni) {
    Pacientes.updateOne(
        {
            dni: dni
        },
        {
            token: "null",
            expireToken: "null"
        },
        {
            new: true
        },
        (err, raw) => {
            if (err) {
                console.log("No se ha podido eliminar el token")
            } else {
                console.log("Tokens eliminados.")
            }
        }
    )
}

function restartPastillas() {
    Pacientes.find({}, async function(err, doc) {
        for (let i = 0; i < doc.length; i++) {
            var token = doc[i].token
            for (let j = 0; j < doc[i].medicamentos.length; j++) {
                var id_medicamento = doc[i].medicamentos[j].id
                var pastillas = []
                for (
                    let k = 0;
                    k < doc[i].medicamentos[j].pastillaTomada.length;
                    k++
                ) {
                    pastillas.push(false)
                }
                await Pacientes.findOneAndUpdate(
                    {
                        token: token,
                        medicamentos: {
                            $elemMatch: {
                                id: id_medicamento
                            }
                        }
                    },
                    {
                        "medicamentos.$.pastillaTomada": pastillas
                    },
                    function(err, doc) {}
                )
            }
        }
        console.log("Pastillas reiniciadas.")
    })
}

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}
