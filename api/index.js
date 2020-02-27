var express = require("express");
var MongoClient = require("mongodb");
var http = require("http");
require("dotenv").config({ path: '.env'});
var app = express();
var server = http.createServer(app);

// Connect to the MongoDB cluster
// MongoClient.connect(process.env.HOST, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

/*
    MÉTODO PARA AUTENTICAR UN USUARIO:
    RECIBE UN USUARIO Y UNA PASSWORD.
    DEVUELVE TRUE SI EL USUARIO EXISTE Y FALSE SI NO ES CORRECTO.
*/
app.get("/api/paciente/auth/:username/:password", (req, res) => {
    var usuario = req.params.username
    var password = req.params.password
    res.send(true)
})

/*
    MÉTODO PARA PREGUNTAR LA MEDICACION DE UN PACIENTE.
    RECIBE UN USUARIO.
    DEVUELVE UN ARRAY CON LA INFORMACION DE LA MEDICACIÓN.
*/
app.get("/api/medicacion/:username", (req, res) => {
    var usuario = req.params.username
    var medicacion = ["Ibuprofeno", "Paracetamol", "Dormidina"]
    res.send(medicacion)
})

/*
    MÉTODO PARA PREGUNTAR LAS CONSULTAS DE UN PACIENTE.
    RECIBE UN USUARIO.
    DEVUELVE UN ARRAY CON LA INFORMACION DE LAS CONSULTAS.
*/
app.get("/api/paciente/consultas/:username", (req, res) => {
    var usuario = req.params.username;
    var consultas = [
        "Miercoles 8 de enero",
        "Martes 8 de febrero",
        "Jueves 8 de marzo"
    ];
    res.send(consultas);
});

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3001;

//INICIO EL SERVIDOR
// app.listen(port, "mongodb+srv://root:P@ssw0rd@paginawebseries-gmhpm.mongodb.net/Series?retryWrites=true&w=majority", function() {
//     console.log("Example app listening on http://localhost:3000 !")
// });

server.listen(port);
server.on('listening', function() {
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});