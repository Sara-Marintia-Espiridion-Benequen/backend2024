const { request, response } = require('express');
const pool = require('../../db/connection');
const { staffQueries } = require('../models/staffQueries');

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
const createStaff = async (req = request, res = response) => {
    const { first_name, last_name, birth_date, gender, phone_number, email, address, is_active, user_id } = req.body;

    if (!first_name || !last_name || !birth_date || !gender || !phone_number || !email || !address || is_active === undefined || !user_id) {
        res.status(400).send('Bad Request. Some fields are missing');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        
        // Verificar si el user_id existe en la tabla users
        const userCheck = await conn.query(staffQueries.checkUserId, [user_id]);
        if (userCheck.length === 0) {
            res.status(404).send('User ID not found in users table');
            return;
        }

        const newStaff = await conn.query(staffQueries.create, [first_name, last_name, birth_date, gender, phone_number, email, address, is_active, user_id]);
        if (newStaff.affectedRows === 0) {
            res.status(500).send('Staff member could not be created');
            return;
        }
        res.status(201).send('Staff member created successfully');
    } catch (error) {
        res.status(500).send(error);
        return;
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
