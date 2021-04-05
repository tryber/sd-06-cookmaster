const userServices = require('../services/CreateUserService');

const createUserControler = async (req, res) => {
  const newUser = await userServices.createUserService(req.body);

  if (newUser.err) return res.status(newUser.err.status).json({ message: newUser.err.message });

  return res.status(201).json(newUser);
};

module.exports = {
  createUserControler,
};