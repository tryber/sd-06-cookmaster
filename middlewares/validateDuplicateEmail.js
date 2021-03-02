const { findByEmail } = require('../services/usersServices');

const CONFLICT = 409;

module.exports = async (req, res, next) => {
  const { email } = req.body;

  const emailFound = await findByEmail(email);
  if (emailFound !== null) {
    return res.status(CONFLICT).send({
      message: 'Email already registered',
    });
  }
  next();
};