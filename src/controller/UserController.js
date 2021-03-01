const { Router } = require('express');
const UserService = require('../service/UserService');
const userValidation = require('../schemas/userValidation');

const router = new Router();

const CREATED = 201;
const CONFLICT = 409;
const INTERNAL_SERVER_ERROR = 500;

router.post('/', userValidation, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const verifyUser = await UserService.findByEmail(email);

    if (verifyUser) {
      return res.status(CONFLICT).json({ message: 'Email already registered' });
    }

    const newUser = await UserService.create(name, email, password);

    return res.status(CREATED).json({ user: newUser });
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
