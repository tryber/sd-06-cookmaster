const { Router } = require('express');
const bodyParser = require('body-parser');

const { userValidation } = require('../middlewares/userValidation');
const { newUser, newAdmin } = require('../controllers/newUser');

const { tokenValidation } = require('../auth/tokenValidation');
const roleValidation = require('../middlewares/roleValidation');

const router = new Router();

router.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));
router.post('/', userValidation, newUser, async (_req, _res) => {});
router.post('/admin', tokenValidation, roleValidation, newAdmin, async (_req, _res) => {});

module.exports = router; 
