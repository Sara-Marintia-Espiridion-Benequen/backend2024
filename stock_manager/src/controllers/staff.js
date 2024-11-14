const { request, response } = require('express');
const pool = require('../../db/connection');
const { staffQueries } = require('../models/staff');
const { usersQueries } = require('../models/users'); //Puede no llevarlo

// Obtener todos los miembros del staff
const getAllStaff = async (req = request, res = response) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const staff = await conn.query(staffQueries.getAllStaff);
        res.send(staff);
    } catch (error) {
        res.status(500).send(error);
        return;
    } finally {
        if (conn) conn.end();
    }
};

// Obtener un miembro del staff por ID
const getStaffById = async (req = request, res = response) => {
    const { id } = req.params;
    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }
    let conn;
    try {
        conn = await pool.getConnection();
        const staffMember = await conn.query(staffQueries.getById, [+id]);
        if (staffMember.length === 0) {
            res.status(404).send('Staff member not found');
            return;
        }
        res.send(staffMember);
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};

// Crear un nuevo miembro del staff
const createStaff = async (req, res) => {
    const { first_name, 
        last_name, 
        birth_date, 
        gender, 
        phone_number, 
        email, 
        address, 
        is_active } = req.body;
    const user_id = req.params.id; // Aquí tomamos el ID de la URL. Este se puede integrar al de arriba el body

    //se mete el if si cualquiera de los datos falta

    // Validar si el user_id existe en la tabla users
    let conn;
    try {
        conn = await pool.getConnection();
        const userExists = await conn.query('SELECT id FROM users WHERE id = ?', [user_id]);

        // Verificamos si el user_id existe
        if (userExists.length === 0) {
            return res.status(404).send('User not found');
        }

        // Insertamos el nuevo staff con el user_id obtenido
        const query = `
            INSERT INTO staff (first_name, last_name, birth_date, gender, phone_number, email, address, is_active, user_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const result = await conn.query(query, [first_name, last_name, birth_date, gender, phone_number, email, address, is_active, user_id]);

        if (result.affectedRows > 0) {
            res.status(201).send('Staff created successfully');
        } else {
            res.status(500).send('Failed to create staff');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error in server');
    } finally {
        if (conn) conn.end();
    }
};

// Actualizar un miembro del staff
const updateStaff = async (req = request, res = response) => {
    const { id } = req.params;
    const { first_name, last_name, birth_date, gender, phone_number, email, address, is_active, user_id } = req.body;

    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }

    if (!first_name && !last_name && !birth_date && !gender && !phone_number && !email && !address && is_active === undefined && !user_id) {
        res.status(400).send('At least one field is required');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const updateResult = await conn.query(staffQueries.update, [first_name, last_name, birth_date, gender, phone_number, email, address, is_active, user_id, +id]);
        
        if (updateResult.affectedRows === 0) {
            res.status(404).send('Staff member not found or no changes made');
            return;
        }
        res.status(200).send('Staff member updated successfully');
    } catch (error) {
        res.status(500).send(error);
        return;
    } finally {
        if (conn) conn.end();
    }
};

// Eliminar un miembro del staff
const deleteStaff = async (req = request, res = response) => {
    const { id } = req.params;

    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const staffMember = await conn.query(staffQueries.getById, [+id]);
        if (staffMember.length === 0) {
            res.status(404).send('Staff member not found');
            return;
        }

        const deleteResult = await conn.query(staffQueries.delete, [+id]);
        if (deleteResult.affectedRows === 0) {
            res.status(500).send('Staff member could not be deleted');
            return;
        }

        res.send('Staff member deleted successfully');
    } catch (error) {
        res.status(500).send(error);
        return;
    } finally {
        if (conn) conn.end();
    }
};

module.exports = { getAllStaff, getStaffById, createStaff, updateStaff, deleteStaff };
