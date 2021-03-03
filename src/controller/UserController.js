const { Router } = require('express');
const UserService = require('../service/UserService');
const userValidation = require('../schemas/userValidation');
const verifyToken = require('../schemas/verifyAuthorization');

const router = new Router();

const CREATED = 201;
const FORBIDDEN = 403;
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

router.post('/admin', verifyToken, userValidation, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { role } = req.user;
    const verifyUser = await UserService.findByEmail(email);

    if (role === 'user') {
      return res.status(FORBIDDEN).json({ message: 'Only admins can register new admins' });
    }
    if (verifyUser) {
      return res.status(CONFLICT).json({ message: 'Email already registered' });
    }

    const newUser = await UserService.create(name, email, password, role);

    return res.status(CREATED).json({ user: newUser });
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
