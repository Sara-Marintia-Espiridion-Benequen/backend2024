const express = require("express");

const app = express();
app.use(express.json());

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

    if(isNaN(id)){
        res.status(400).send({error:"El id debe ser un número"});
        return;
    };

    const usuario = usuarios .find((usuario) => usuario.id === +id);

    if (usuario === undefined){
        res.status(404).send({error: `El usuario con id ${id} no existe`});
        return;
};
    res.status(200).send(usuario);
});

/*app.post ("/usuarios", (req, res) => { 
    const{nombre, apellido, email} = req.body;

    
    validaciones
    -la informacion debe estar completa
    nombre, apellido y correo. sino viene hay que devolver un error 400
    -el email dede ser unico  400
    

    usuarios.push({id: usuarios.length+ 1, nombre, apellido, email});
    res.status(201).send("El usuario se agrego correctamente");
});*/

app.post("/usuarios", (req, res) => {
    const { nombre, apellido, email } = req.body;

    // Validar que el nombre esté presente
    if (!nombre) {
        return res.status(400).send("El campo 'nombre' es obligatorio.");
    }

    // Validar que el apellido esté presente
    if (!apellido) {
        return res.status(400).send("El campo 'apellido' es obligatorio.");
    }

    // Validar que el email esté presente
    if (!email) {
        return res.status(400).send("El campo 'email' es obligatorio.");
    }

    // Validar que el email sea único
    const emailExiste = usuarios.some(usuario => usuario.email === email);
    if (emailExiste) {
        return res.status(400).send("El correo ya está registrado.");
    }

    // Si todas las validaciones pasan, agregar el usuario
    usuarios.push({ id: usuarios.length + 1, nombre, apellido, email });
    res.status(201).send("El usuario se agregó correctamente.");
});


app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});