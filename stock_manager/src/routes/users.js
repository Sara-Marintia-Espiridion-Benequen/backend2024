const {Router} = require('express');
const {getAllUsers, getUserById, CreateUser, loginUsers, updateUser, deleteUser, loginUpdate} = require('../controllers/users');

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', CreateUser);
router.post('/login', loginUsers);
router.put('/:id', updateUser);
router.put('/loginUpdate',loginUpdate);
router.delete('/:id', deleteUser);


module.exports = router;
