const {Router} = require('express');
const {getAll, getById} = require('../controilers/users');

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);

module.exports = router;