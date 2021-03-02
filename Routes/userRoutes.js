const { Router } = require('express');
const validateUser = require('../Middlewares/validateUser');

const router = new Router();

router.post('/', validateUser);

module.exports = router;
