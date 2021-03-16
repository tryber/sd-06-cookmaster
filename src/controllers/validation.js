const Users = require('../models/Users');

async function validateUser(req, res, next) {
  const { name, email, password } = req.body;

  if (!name || !email || !password || (!email.includes('@') && !email.includes('.com'))) {
    return res.status(400)
    .json({ message: 'Invalid entries. Try again.' });
  }

  // O campo email deve ser único
  const emailExists = await Users.findByEmail(email);

  if (emailExists) res.status(409).json({ message: 'Email already registered' });
  else next();
}

module.exports = {
  validateUser,
};
