const CreateUserService = require('../services/CreateUserService');
const LoginUserService = require('../services/LoginUserService');

const OK = 200;
const CREATED = 201;
const CONFLICT = 409;

const createUser = async (req, res) => {
  try {
    const newUser = await CreateUserService(req.body, res); 
  
    res.status(CREATED).json({
      user: newUser.ops[0],
    });
  } catch (error) {
    return res.status(CONFLICT).json({ message: 'Email already registered' });
  }
}; 

const loginUser = async (req, res) => {
  const tokenUser = await LoginUserService(req.body);

  if (tokenUser) {
    return res.status(OK).json({ token: tokenUser.token });
  }
}; 

module.exports = {
  createUser,
  loginUser,
};
