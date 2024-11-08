const {Router} = require('express');
const {getAllUsers, CreateUser, getUserById, updateUser, deleteUser} = require('../controllers/users');

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', CreateUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


module.exports = router;
