const jwt = require('jsonwebtoken');
const { SECRET } = require('../dictionary/constants');
const UserModel = require('../model/UserModel');

const createUser = async (user) => {
  const userWithRole = user;
  userWithRole.role = 'user';

  return UserModel.createUser(userWithRole);
};

const findByEmail = async (email) => (UserModel.findByEmail(email));

const getUserId = async (request) => {
  try {
    const token = request.headers.authorization;
    const { email } = jwt.verify(token, SECRET);
    const [user] = await findByEmail(email);
    const { _id: userId } = user;
    
    return userId;
  } catch (error) {
    return 'Error';
  }
};

module.exports = {
  createUser,
  findByEmail,
  getUserId,
};
