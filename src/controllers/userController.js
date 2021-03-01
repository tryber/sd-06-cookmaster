const service = require('../services/serviceUser');
const {
  created,
  conflict,
  badRequest,
} = require('../utils/messages');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const role = 'user';
  if (!name || !email || !password) {
    return res.status(badRequest).json({ message: 'Invalid entries. Try again.' });
   }
  const emailNoExist = await service.emailExist(name, email, password);
  if (!emailNoExist) return res.status(conflict).json({ message: 'Email already registered' });
  const newUser = await service.userCreate(name, email, password, role);
  res.status(created).json(newUser);
};

module.exports = {
  createUser,
};
