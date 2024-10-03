const express = require("express");

const app = express();

app.get("/usuarios", (req, res) =>{
    const usuarios = [
        {
            id: 1,
            nombre: "Sara",
            apellido:"Espiridion",
            email:"sarah93.ad@gmail.com",
        },
    ]
    res.status(404).send(usuarios);
})

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});