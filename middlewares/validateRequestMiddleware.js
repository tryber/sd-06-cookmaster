const { getUserByName, getUserByEmail } = require('../models/usersModel');

const MinMaxLength = 3;
const BADREQUEST = 400;
const CONFLICT = 409;

const errorObj = {
  message: 'Invalid entries. Try again.',
};

async function validateRequest(req, res, next) {
  const { name, email } = req.body;
  if (Object.entries(req.body).length !== MinMaxLength) {
    return res.status(BADREQUEST).json(errorObj);
  }

  const foundUserByName = await getUserByName(name);
  const foundUserByEmail = await getUserByEmail(email);

  if (foundUserByName !== null) {
    return res.status(CONFLICT).json({ message: 'Email already registered' });
  }
  if (foundUserByEmail !== null) {
    return res.status(CONFLICT).json({ message: 'Email already registered' });
  }
  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(email)) {
    return res.status(BADREQUEST).json(errorObj);
  }
  return next();
}

module.exports = validateRequest;
