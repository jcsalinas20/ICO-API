const express = require("express")
const router = express.Router()
const controllers = require("../controllers/controllers")

module.exports = () => {
    // router.get("/users/:username/:password", controllers.users)

    router.get("/api/doctores/:username", controllers.getDoctor)

    router.get("/api/paciente/auth/:dni/:password", controllers.loginPaciente)

    router.get("/api/:dni/medicamentos", controllers.pacienteListaMed)

    router.get("/api/:dni/consultas", controllers.pacienteListaConsultas)

    return router;
}
