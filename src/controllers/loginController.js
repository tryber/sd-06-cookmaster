const { Router } = require('express');
const UsersModel = require('../models/usersModel');
const createToken = require('../auth/createToken');

const { invalidEmailOrPassword } = require('../middlewares/invalidEntries');

const router = Router();

router.post('/', invalidEmailOrPassword, async (req, res) => {
  const { email, password } = req.body;

  const user = await UsersModel.findByEmail(email);

  if (!user || user.password !== password) {
    return res.status(401).json({
      message: 'Incorrect username or password',
    });
  }

  const token = createToken(user);

  return res.status(200).json({ token });
});

module.exports = router;