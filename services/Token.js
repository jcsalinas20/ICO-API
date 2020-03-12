"use strict"
const sha1 = require("sha1")
const moment = require("moment")
const uuidv4 = require("uuid")

module.exports = {
    create: async function(body) {
        const ORDER_ID = await getOrderId()
        const TIMESTAMP = await getMoment()

        const token = await createHash(ORDER_ID, TIMESTAMP, body.dni, body.password)

        this.putToken(token, body)

        return token
    },
    putToken: function(token, body) {
        // METER TOKEN CON QUERY
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
