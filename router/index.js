const express = require("express")
const router = express.Router()
const controllers = require("../controllers/controllers")

module.exports = () => {
    router.get("/", controllers.home)

    router.get("/users/:username/:password", controllers.users)

    router.get("/doctores/:username", controllers.doctores)

    return router;
}
