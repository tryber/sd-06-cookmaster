const { Router } = require('express');
const bodyParser = require('body-parser');

const { validateUser } = require('../middlewares/validateUser');
const { createUser, createAdmin } = require('../controllers/createUser');

const { validateToken } = require('../auth/validateToken');
const checkRole = require('../middlewares/checkRole');

const router = new Router();

// good practice
router.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));

router.post('/', validateUser, createUser, async (_req, _res) => {});

router.post('/admin', validateToken, checkRole, createAdmin, async (_req, _res) => {});

module.exports = router;