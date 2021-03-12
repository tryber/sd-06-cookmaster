const { Router } = require('express');
const loginValidation = require('../schemas/loginValidation');
const UserService = require('../service/UserService');
const createToken = require('../auth/createToken');

const router = new Router();

const OK = 200;
const UNAUTHORIZED = 401;
const INTERNAL_SERVER_ERROR = 500;

router.post('/', loginValidation, async (req, res) => {
  try {
    const { email, password } = req.body;

    const verifyUser = await UserService.findByEmail(email);

    if (!verifyUser || verifyUser.password !== password) {
      return res.status(UNAUTHORIZED).json({ message: 'Incorrect username or password' });
    }

    const token = createToken(verifyUser);

    return res.status(OK).json({ token });
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
