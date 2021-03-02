const jwt = require('jsonwebtoken');
const userModels = require('../Models/usersModel');

const createStatus = 201;
const OK = 200;

const create = async (req, res) => {
  const { name, email, password } = req.body;

  const created = await userModels.create(name, email, password);

  res.status(createStatus)
    .json({ user: { _id: created.insertedId, name, email, password, role: 'user' } });
};

const login = async (req, res) => {
  const { email } = req.body;
  
  const getEmail = await userModels.getByEmail(email);
  const payload = {
    '_id': getEmail._id,
    email: getEmail.email,
    role: 'user',
  };
  const segredo = 'cabeça';
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: payload }, segredo, jwtConfig);

  res.status(OK).json({ token });
};

module.exports = {
  create,
  login,
};
