var express = require("express");
var MongoClient = require("mongodb");
var http = require("http");
require("dotenv").config({ path: '.env'});
var app = express();

// Connect to the MongoDB cluster
MongoClient.connect(process.env.HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

/*
    MÉTODO PARA AUTENTICAR UN USUARIO:
    RECIBE UN USUARIO Y UNA PASSWORD.
    DEVUELVE TRUE SI EL USUARIO EXISTE Y FALSE SI NO ES CORRECTO.
*/
app.get("/paciente/auth/:username/:password", (req, res) => {
    var usuario = req.params.username
    var password = req.params.password
    res.send(true)
})

/*
    MÉTODO PARA PREGUNTAR LA MEDICACION DE UN PACIENTE.
    RECIBE UN USUARIO.
    DEVUELVE UN ARRAY CON LA INFORMACION DE LA MEDICACIÓN.
*/
app.get("/paciente/medicacion/:username", (req, res) => {
    var usuario = req.params.username
    var medicacion = ["Ibuprofeno", "Paracetamol", "Dormidina"]
    res.send(medicacion)
})

/*
    MÉTODO PARA PREGUNTAR LAS CONSULTAS DE UN PACIENTE.
    RECIBE UN USUARIO.
    DEVUELVE UN ARRAY CON LA INFORMACION DE LAS CONSULTAS.
*/
app.get("/paciente/consultas/:username", (req, res) => {
    var usuario = req.params.username;
    var consultas = [
        "Miercoles 8 de enero",
        "Martes 8 de febrero",
        "Jueves 8 de marzo"
    ];
    res.send(consultas);
});

//MENSAJE QUE VE EL USUARIO CUANDO ENTRA A LA URL
app.get("/", (req, res) => {
    res.status(200).send("<h1>API REST OPERATIVO</h1>")
});

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

//INICIO EL SERVIDOR
app.listen(port, host, () => {
    console.log("Example app listening on http://localhost:3000 !")
});