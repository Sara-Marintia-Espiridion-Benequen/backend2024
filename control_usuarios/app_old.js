const express = require("express");

const app = express();

app.get("/", (req, res) =>{
    res.status(404).send("Hola mundo!");
})//GET cuando queremos informacion

app.get("/prueba", (req, res) =>{
    res.status(404).send("Hola desde la prueba");
})

app.post("/", (req, res) =>{
    res.status(404).send("Hola desde POST");
})//POST crear nuevo recurso

app.put("/", (req, res) =>{
    res.status(404).send("Hola desde PUT");
})//PUT actualizar un recurso, lo actualizar completo osea lo sustituye

app.patch("/", (req, res) =>{
    res.status(404).send("Hola desde PATCH");
})//PATCH actualizar un recurso, cuando sea una actualizacion parcial

app.delete("/", (req, res) =>{
    res.status(404).send("Hola desde DELETE");
})//DELETE lo que hace es eliminar recurso, de ahi parten 2 eliminacion: harddelete, eliminamos todo, softdilete, solo borramos algo que puede estar pero el sistema lo ignora

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});