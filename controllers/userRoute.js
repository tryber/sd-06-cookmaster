const { Router } = require('express');
const bodyParser = require('body-parser');

const validateRequest = require('../middlewares/validateRequestMiddleware');
const createUser = require('../middlewares/createUserMiddleware');

const router = new Router();

// good practice
router.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));

router.post('/', validateRequest, createUser, async (_req, _res) => {});

module.exports = router;