const { request, response } = require('express');
const { usersQueries } = require('../models/users');

const users = [ //crear arreglo
  { id: 1, name: 'Sara' }, //los registro que se va a almacenar
  { id: 2, name: 'Marintia' },
  { id: 3, name: 'Lalis ig' },
];

/*const getMessage = (req = resquest, res=response) => { //se va a crear la funcion que responda la consulta en particular
//la funcion () =>{} espera el route q lleva 2 parametros 
res.send('Hello Bangtan_ HELLO FROM THE USERS CONTROLLER!');

} */

// paraObtener todos los usuarios
const getAllUsers = (req = request, res = response) => {
  let conn;
  try {
    conn = await.pool.getConnection();
    const users = await.conn.query(usersQueries.getAll);
  }catch (error) {
    res.status(500).send(error);
    return
  } finally{
    if (conn) conn.end();
  }
};

// para Obtener un usuario por ID
const getUsersById = async(req = request, res = response) => {
  const { id } = req.params; ;//se acceda en el solicitud atreves de req
  //se tiene que validar un numero por id

  if (isNaN(id)) {
    res.status(400).send('Invalid ID');
    return;
  }

  let conn;
  try{
    conn = await pool.getConnection();
    const user = conn.query(usersQueries.getById, [+id]);

    if (!user) {
      res.status(404).send('User not found');
      return;
    }

  }catch(error){
    res.status(500).send(error);
  } finally {
    if (conn) conn.end();
  }

  

 
  //si el variable de usuario termine el valor si a ningino se debe avisar al users
  
  res.send(user);
};

// paraAgregar un nuevo usuario
const addUser = (req = request, res = response) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).send('Name is required');
    return;
  }
  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).send(newUser);
};

// Actualizar un usuario existente
const updateUser = (req = request, res = response) => {
  const { id } = req.params;
  const { name } = req.body;

  if (isNaN(id)) {
    res.status(400).send('Invalid ID');
    return;
  }

  const user = users.find((user) => user.id === +id);
  if (!user) {
    res.status(404).send('User not found');
    return;
  }

  if (!name) {
    res.status(400).send('Name is required');
    return;
  }

  user.name = name;
  res.send(user);
};

// Eliminar un usuario
const deleteUser = (req = request, res = response) => {
  const { id } = req.params;

  if (isNaN(id)) {
    res.status(400).send('Invalid ID');
    return;
  }

  const index = users.findIndex((user) => user.id === +id);
  if (index === -1) {
    res.status(404).send('User not found');
    return;
  }

  users.splice(index, 1);
  res.status(204).send(); // 204 No Content indica éxito sin contenido adicional
};

module.exports = { getAllUsers, getUsersById, addUser, updateUser, deleteUser }; 