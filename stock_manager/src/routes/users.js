const {Router} = require('express');
const {getMessage} = require('../controilers/users');

const router = Router();

router.get('/', getMessage);

module.exports = router;