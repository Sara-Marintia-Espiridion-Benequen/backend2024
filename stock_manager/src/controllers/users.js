const {request, response} = require ('express');
const pool = require('../../db/connection');
const { usersQueries } = require('../models/users');

//const users = [
//    {id: 1, name: 'Jhon Doe'},
//    {id: 2, name: 'Jane Doe'},
//    {id: 3, name: 'Bob Smith'},
//];

const getAllUsers = async (req = request, res= response) => {
    let conn;
    try{
        conn = await pool.getConnection();
        const users = await conn.query(usersQueries.getAllUsers);

        res.send(users);
    }catch (error){
        res.status(500).send(error);
        return;
    }finally{
        if (conn) conn.end();
    }

}

const getUserById = async (req = request, res= response) =>{
    const {id} = req.params;
    if(isNaN(id)){
        res.status(400).send('Invalid ID');
        return;
    }
    let conn;
    try{
        conn = await pool.getConnection();
        const user = await conn.query(usersQueries.getById, [+id]);
        
        if(user.length ===0){
        res.status(404).send('User not found')
        return;
    }
    res.send(user);
    }catch (error){
        res.status(500).send(error);
    }finally{
        if(conn) conn.end();
    }    
}


//agregar un usuario
const CreateUser = async (req = request, res = response) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        res.status(400).send('Bad Request. Some fields are missing');
        return;
    }
    let conn;
    try{
        conn = await pool.getConnection();
        const user = await conn.query(usersQueries.getByUsername, [username]);
        
        if(user.length > 0){
            res.status(409).send('Username already exits');
            return;
        }
        const newUser = await conn.query(usersQueries.create, [username, password, email]);
        
        if(newUser.affectedRows === 0){
            res.status(500).send('user could not be created');
            return;
        }
        res.status(201).send("user created succefully");
    }catch (error){
        res.status(500).send(error);
        return;
    }finally{
        if(conn) conn.end();
    }
};

//Actualizar
const updateUser = async (req = request, res = response) => {
    const { id } = req.params;
    const { name, password, email } = req.body;

    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }

    if (!name && !password && !email) {
        res.status(400).send('At least one fiel (name, password or email) is required');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        //Actualizar solo los campos que se pasen en el cuerpo de la solicitud
        const user = await conn.query(usersQueries.update,[name, password, email, +id]);

        if (updateUser.affectedRows === 0) {
            res.status(404).send('User not found or no changes made');
            return;
        }

        res.status(200).send('User update successfully');
    }catch (error) {
        res.status(500).send(error);
        return;
    } finally {
        if (conn) conn.end();
    }
    };

//Eliminar
const deleteUser = async (req = request, res = response) => {
    const { id } = req.params;

    if (isNaN(id)) {
        res.status(400).send('Ivalid Id');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const user = await conn.query(usersQueries.getById, [+id]);
        if(user.length ===0){
        res.status(404).send('User not found');
        return;
        }

        const deleteUser = await pool.query(usersQueries.delete, [+id]);

        if (deleteUser.affectedRows === 0) {
            res.status(500).send('User could not be deleted');
            return;
        }

        res.send('User deleted successfully');
    }catch (error) {
        res.status(500).send(error);
        return;
    } finally {
        if (conn) conn.end();
    }

}

module.exports = { getAllUsers, getUserById, CreateUser, updateUser, deleteUser };