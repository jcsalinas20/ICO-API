const express = require("express")
const router = express.Router()
const controllers = require("../controllers/controllers")

module.exports = () => {

    router.get("/api/noticias", controllers.getNoticias)
    
    router.get("/api/paciente/auth/:dni/:password", controllers.loginPaciente)
    
    router.get("/api/:dni/logout", controllers.cerrarSesion)
    
    router.get("/api/:token/perfil", controllers.getPerfil)

    router.get("/api/:token/medicamentos", controllers.pacienteListaMedicinas)

    router.get("/api/:token/cambioEstadoPastilla/:id/:hora/:estado", controllers.pacienteCambioEstadoPastilla)

    router.get("/api/:token/consultas", controllers.pacienteListaConsultas)

    router.get("/api/:token/historial-consultas", controllers.pacienteListaHistorialConsultas)

    router.get("/api/:token/primer-inicio-sesion", controllers.pacientePrimerInicioSesion)

    router.get("/api/:token/cambio-password/:password", controllers.pacienteCambioPassword)

    router.get("/api/:token/idioma/:leng", controllers.cambioIdioma)

    router.get("/api/vaidacionToken", controllers.vaidacionToken)

    router.get("/api/restartPastillas", controllers.restartPastillas)

    return router;
}
