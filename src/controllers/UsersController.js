const { Router } = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const Users = require('../services/UsersService');
const { validateUsers } = require('../middlewares');

const router = new Router();
router.use(bodyParser.json());

const CREATED = 201;

router.post('/', validateUsers, rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await Users.create(name, email, password);
  res.status(CREATED).json({ user });
}));

module.exports = router;
