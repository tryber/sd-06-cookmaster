const { findByEmail } = require('../services/usersServices');

function validateFields(email, password) {
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const validEmail = emailRegex.test(email);

  const allFields = 'All fields must be filled';
  const incorrect = 'Incorrect username or password';

  let errorMessage = false;

  switch (true) {
    case (!password || typeof password !== 'string'): errorMessage = allFields; break;
    case (!email): errorMessage = allFields; break;
    case (!validEmail): errorMessage = incorrect; break;
    default: return null;
  }

  return errorMessage;
}

async function checkUser(email, password) {
  try {
    const findUser = await findByEmail(email);

    if (findUser && findUser.password === password) return true;

    return 'Incorrect username or password';
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = async (req, res, next) => {
  const { email, password } = req.body;
  const UNAUTHORIZED = 401;
  const validFields = validateFields(email, password);

  if (validFields) {
      return res.status(UNAUTHORIZED).send({
      message: validFields,
    });
  }
  const messageLogin = await checkUser(email, password);
  if (messageLogin !== true) {
    return res.status(UNAUTHORIZED).send({
      message: messageLogin,
    });
  }

  next();
};
