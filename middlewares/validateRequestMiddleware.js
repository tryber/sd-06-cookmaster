const { userByName, userByEmail } = require('../models/usersModel');

const errorMessage = {
  message: 'Invalid entries. Try again.',
};

async function validateRequest(req, res, next) {
  const { name, email } = req.body;
  if (Object.entries(req.body).length !== 3) {
    return res.status(400).json(errorMessage);
  }

  const foundByName = await userByName(name);
  const foundByEmail = await userByEmail(email);

  if (foundByName !== null) {
    return res.status(409).json({ message: 'Email already registered' });
  }
  if (foundByEmail !== null) {
    return res.status(409).json({ message: 'Email already registered' });
  }
  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(email)) {
    return res.status(400).json(errorMessage);
  }
  return next();
}

module.exports = validateRequest;
