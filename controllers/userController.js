const { Router } = require('express');

const UsersServices = require('../services/UserService/usersService');
const { signUpValidation } = require('../services/UserService/SignUpValidation');
const status = require('../utils/status');
const CheckAdminCredential = require('../services/Authorization/CheckAdminCredential.js');
const VerifyUserToken = require('../services/Authorization/VerifyUserToken');

const route = Router();

route.get('/',
  async (_req, res) => {
  const users = await UsersServices.findAll();  
  return res.status(status.OK).json({ users });
});

route.get('/:id',

  async (req, res) => {
    const { id } = req.params;
    const user = await UsersServices.findOneById(id);
    return res.status(status.OK).json({ user });
});

route.post('/admin', 
  signUpValidation.checkDuplicateEmail,
  signUpValidation.checkUserData,
  VerifyUserToken,
  CheckAdminCredential,
  async (req, res) => {
    const { name, email, password } = req.body;
    const adminRole = 'admin';
    const insertedId = await UsersServices.createOne({ name, email, password, role: adminRole });
    res.status(status.CREATED).json({ user: { _id: insertedId, name, email, role: adminRole } });
  });

route.post('/',
  signUpValidation.checkDuplicateEmail,
  signUpValidation.checkUserData,
  async (req, res) => {
    const { name, email, password } = req.body;
    const userRole = 'user';
    const insertedId = await UsersServices.createOne({ name, email, password, role: userRole });
    res.status(status.CREATED).json({ user: { _id: insertedId, name, email, role: userRole } });
  });

route.use('/', async (err, _req, res, _next) => {
  console.log(err, 'error found');
  return res.status(err.status).json({ message: err.message });
});

module.exports = route;