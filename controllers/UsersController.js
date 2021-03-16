const { Router } = require('express');
const {
  userRegister,
} = require('../models/Users');
const { validateInsertData, validateAdminRole } = require('../services/UsersServices');
const { verifyValidToken, validateJwt } = require('../services/LoginServices');

const UsersRouter = new Router();
const missingAuthToken = 'missing auth token';

UsersRouter.post('/', async (req, res) => {
  const { name, email, role, password } = req.body;

  try {
    const validData = await validateInsertData(name, email, role, password);
    const newUser = await userRegister(validData[0].user);

    return res.status(validData[1]).json(newUser);
  } catch (error) {
    return res.status(error[1]).json(error[0]);
  }
});

UsersRouter.post('/admin', async (req, res) => {
  const { name: newName, email: newEmail, password: newPassword } = req.body;
  const token = req.headers.authorization;
  const newRole = 'admin';
  if (!token) return res.status(401).json({ message: missingAuthToken });

  try {
    const { email, password } = verifyValidToken(token);
    await validateJwt(email, password);
    await validateAdminRole(email);
    const validData = await validateInsertData(newName, newEmail, newRole, newPassword);
    const newUser = await userRegister(validData[0].user);

    return res.status(validData[1]).json(newUser);
  } catch (error) {
    return res.status(error[1]).json(error[0]);
  }
});

module.exports = UsersRouter;
