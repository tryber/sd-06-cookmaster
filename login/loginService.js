const usersModel = require('../users/usersModel');

const generateToken = require('../authentication/generateToken');

exports.findByEmail = async (requestName, requestEmail, requestPassword) => {
  console.log('LOGIN SERVICE');
  const result = await usersModel.findByEmail(requestEmail);
  console.log('RESULT DO FIND BY EMAIL NO LOGIN SERVICE', result);

  // { message: 'Incorrect username or password' };
  if (result === null) {
    const newUser = await usersModel.createUser(requestName, requestEmail, requestPassword);
    return newUser;
  }

  const { _id, email, role, password } = result;
  console.log('UNDERLINE ID login service', _id);
  if (email === requestEmail && password === requestPassword) {
    const token = await generateToken({ _id, email, role });
    return { token, _id };
  }

  return { message: 'Incorrect username or password' };
};
