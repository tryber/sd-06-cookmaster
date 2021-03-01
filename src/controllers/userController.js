const service = require('../services/serviceUser');
const {
  created,
} = require('../utils/messages');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await service.userCreate(name, email, password);
  res.status(created).json(newUser);
};

module.exports = {
  createUser,
};
