const { Router } = require('express');
const rescue = require('express-rescue');
const UserService = require('../service/UserService');
const { validateField, userExist } = require('../middlewares/validations');

const router = Router();
const CREATED = 201;

router.post('/users', validateField, userExist, rescue(async (req, res) => {
  const user = req.body;
  const insertedId = await UserService.registerUser(user);
  return res.status(CREATED).json(insertedId);
}));

module.exports = router;