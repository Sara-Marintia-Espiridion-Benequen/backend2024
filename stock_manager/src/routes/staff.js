const express = require('express');
const { getAllStaff, getStaffById, createStaff, updateStaff, deleteStaff } = require('../controllers/staff');
const router = express.Router();


router.get('/', getAllStaff);
router.get('/:id', getStaffById);
router.post('/:id', createStaff); // Ruta para agregar un nuevo registro de staff. puedes quitar :id
router.put('/:id', updateStaff);
router.delete('/:id', deleteStaff);

module.exports = router;
