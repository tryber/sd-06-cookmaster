const usersModel = require('../users/usersModel');

const generateToken = require('../authentication/generateToken');

exports.findByEmail = async (requestEmail, requestPassword) => {
  console.log('LOGIN SERVICE');
  const result = await usersModel.findByEmail(requestEmail);
  // console.log('RESULT DO FIND BY EMAIL NO LOGIN SERVICE', result);
  if (result === null) {
    return { message: 'Incorrect username or password' };
  }
  const { _id, email, role, password } = result;
  // console.log('UNDERLINE ID login service', _id);
  if (email === requestEmail && password === requestPassword) {
    // console.log('UNDERLINE ID login service DENTRO IF', _id, email, role);
    const token = await generateToken({ _id, email, role });
    return { token, _id };
  }

  return { message: 'Incorrect username or password' };
};
