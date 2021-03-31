const { createToken } = require('../auth/createToken');
const { getUserByEmail } = require('../model/userModel');

const loginAuthentication = async (login) => {
  const userFromDatabase = await getUserByEmail(login.email);
  
  if (!userFromDatabase) return null;

  const emailIncorrect = userFromDatabase.email !== login.email;
  const passwordIncorrect = userFromDatabase.password !== login.password;

  if (emailIncorrect || passwordIncorrect) return null;

  const { _id: id, email, role } = userFromDatabase;
  const token = createToken({ id, email, role });

  return token;
};

module.exports = { loginAuthentication };
