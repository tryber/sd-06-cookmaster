const CONFLICT = 409;
const { getAllUsers } = require('../Model/usersModel');

const checkUniqueEmail = async (request, response, next) => {
  const { email } = request.body;
  const usersList = await getAllUsers();
  const Exists = await usersList.find((users) => users.email === email);

  if (Exists) {
    return response.status(CONFLICT).json({ message: 'Email already registered' });
  }

  next();
};

module.exports = { checkUniqueEmail };
