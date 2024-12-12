const { Router } = require('express');
const { getAllUsers, getUserById, CreateUser, updateUser, destroyUser, userProtected} = require('../controllers/users');
const verifyToken = require('../middlewares/verifyToken');

const router = Router();
router.get('/', getAllUsers);
router.get('/protected', verifyToken, userProtected)
router.get('/:id',getUserById);
router.post('/', CreateUser);
router.put('/:id',updateUser);
router.delete('/:id', destroyUser);


module.exports = router;