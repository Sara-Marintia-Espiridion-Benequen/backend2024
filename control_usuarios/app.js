const express = require("express");

const app = express();
const usuarios = [
    {
        id: 1,
        nombre: "Sara",
        apellido:"Espiridion",
        email:"sarah93.ad@gmail.com",
    },
    {
        id: 2,
        nombre: "Juan",
        apellido:"Teodoro",
        email:"JuanTeodor.ad@gmail.com",
    },
]

app.get("/usuarios", (req, res) =>{
    res.status(200).send(usuarios);
})

app.get("/usuarios/:id", (req, res) => {
    const {id} = req.params;
    const usuario = usuarios .find((usuario) => usuario.id === +id);

    res.status(200).send(usuario);
})

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});