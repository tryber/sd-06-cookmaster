const { Router } = require('express');

const UsersServices = require('../services/UserServices/UsersServices');
const { signUpValidation } = require('../services/UserServices/SignUpValidations');
const status = require('../utils/status');

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

route.post('/',
  signUpValidation.checkDuplicateEmail,
  signUpValidation.checkUserData,
  async (req, res) => {
    const { name, email, password } = req.body;
    const userRole = 'user';
    const insertedId = await UsersServices.createOne({ name, email, password, role: userRole });
    console.log('no error');
    res.status(status.CREATED).json({ user: { _id: insertedId, name, email, role: userRole } });
  });

route.use('/', async (err, _req, res, _next) => {
  console.log(err, 'error found');
  return res.status(err.status).json({ message: err.message });
});

module.exports = route;
