const express = require("express")
const router = express.Router()
const controllers = require("../controllers/controllers")

module.exports = () => {
    // router.get("/users/:username/:password", controllers.users)

    // router.get("/api/doctores/:username", controllers.getDoctor)

    router.get("/api/paciente/auth/:dni/:password", controllers.loginPaciente)

    router.get("/api/:dni/medicamentos", controllers.pacienteListaMedicinas)

    router.get("/api/:token/consultas", controllers.pacienteListaConsultas)

    router.get("/api/:dni/primer-inicio-sesion", controllers.pacientePrimerInicioSesion)

    router.get("/api/:dni/cambio-password/:password", controllers.pacienteCambioPassword)

    router.get("/api/vaidacionToken", controllers.vaidacionToken)

    // router.get("/api/:dni/info-consulta", controllers.pacientePrimerInicioSesion)

    return router;
}
