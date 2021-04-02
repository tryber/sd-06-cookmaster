const usersModel = require('../users/usersModel');

const generateToken = require('../authentication/generateToken');

exports.findByEmail = async (requestEmail, requestPassword) => {
  const result = await usersModel.findByEmail(requestEmail);

  if (result.length === 0) return { message: 'Incorrect username or password' };

  const { _id, user: { email, role, password } } = result[0];
  if (email === requestEmail && password === requestPassword) {
    const token = await generateToken({ _id, email, role });
    return { token };
  }

  return { message: 'Incorrect username or password' };
};
