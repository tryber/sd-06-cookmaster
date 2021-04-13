const { Router } = require('express');
const createToken = require('../auth/createToken');
const userServices = require('../services/usersServices');
const { validateEmail, validatePassword } = require('../middleware/loginValidation');

const router = Router();

router.post('/', validateEmail, validatePassword, async (req, res) => {
  const { email, password } = req.body;
  const getUser = await userServices.findUserByEmailAndPassword(email, password);
  
  if (getUser.isError) {
    return res.status(getUser.status).json({ message: getUser.message });
  }

  const payload = {
    name: getUser.name,
    email: getUser.email,
    role: getUser.role,
  };

  const token = createToken(payload);
  console.log('Token aqui', token);

  return res.status(200).json({ token });
});

module.exports = router;
