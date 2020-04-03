"use strict"
const sha1 = require("sha1")
const moment = require("moment")
const uuidv4 = require("uuid")
const Pacientes = require("../models/Pacientes")

module.exports = {
    create: async function(body) {
        const ORDER_ID = await getOrderId()
        const TIMESTAMP = await getMoment()

        const token = await createHash(
            ORDER_ID,
            TIMESTAMP,
            body.dni,
            body.password
        )

        await this.putToken(token, body)

        return token
    },
    putToken: async function(jwt, body) {
        const filter = {
            dni: body.dni
        }
        const update = {
            token: jwt
        }
        await Pacientes.findOneAndUpdate(filter, update, {
            useFindAndModify: false
        })
    },
    expireDate: async function(body) {
        const date = moment().format("DD-MM-YYYY")
        var new_date = moment(date, "DD-MM-YYYY").add(30, "days")
        var day = new_date.format("DD")
        var month = new_date.format("MM")
        var year = new_date.format("YYYY")
        const expire = day + "-" + month + "-" + year + ":00"

        const filter = {
            dni: body.dni
        }
        const update = {
            expireToken: expire
        }
        await Pacientes.findOneAndUpdate(filter, update, {
            useFindAndModify: false
        })
    }
}

async function createHash(...params) {
    const SECRET = process.env.SECRET_SHARED
    const initialHash = sha1(params.join(".") + "." + SECRET)
    return initialHash
}

async function getOrderId() {
    return uuidv4.v4()
}

async function getMoment() {
    return moment().format("YYYYMMDDHHmmss")
}
