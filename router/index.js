const express = require("express")
const router = express.Router()
const controllers = require("../controllers/controllers")

module.exports = () => {
    // router.get("/users/:username/:password", controllers.users)

    router.get("/api/doctores/:username", controllers.getDoctor)

    return router;
}
