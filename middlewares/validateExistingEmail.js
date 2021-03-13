const { findEmail } = require('../services/userServices');

module.exports = async (req, res, next) => {
  const CONFLICT = 409;
  const { email } = req.body;

  const emailValid = await findEmail(email);
  if (emailValid !== null) {
    return res.status(CONFLICT).send({
      message: 'Email already registered',
    });
  }
  next();
};
