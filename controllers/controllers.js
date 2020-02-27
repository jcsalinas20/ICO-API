const Users = require("../models/Users")

exports.users = (req, res) => {
    let respuesta;
    res.send("API REST")
    const users = new Users({
        username: req.params.username,
        password: req.params.password,
        privileges: "user"
    })
    try {
        let resultado = users.save();
        respuesta = {
            mensaje: 'Insertado correctamente',
            user: resultado.password
        };
    } catch (error) {
        console.log(error);
        respuesta = {
            error: 'Error insertando'
        };
    }
    res.json(respuesta);
}

exports.doctores = (req, res) => {
    Users.findOne({ username: req.params.username }).exec(function(err, doc){
        res.json(doc);
    });
}
