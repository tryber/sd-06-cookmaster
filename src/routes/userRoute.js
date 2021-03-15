const { Router } = require('express');
const bodyParser = require('body-parser');

const { validateUser } = require('../middlewares/validateUser');
const { createUser } = require('../controllers/createUser');

const router = new Router();

// good practice
router.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));

router.post('/', validateUser, createUser, async (_req, _res) => {});

module.exports = router;