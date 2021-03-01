const CreateUserService = require('../services/CreateUserService');

const CREATED = 201;
const CONFLICT = 409;

const createUser = async (req, res) => {
  try {
    const newUser = await CreateUserService(req.body); 
  
    res.status(CREATED).json({
      user: newUser,
    });
  } catch (error) {
    return res.status(CONFLICT).json({ message: 'Email already registered' });
  }
}; 

module.exports = {
  createUser,
};
