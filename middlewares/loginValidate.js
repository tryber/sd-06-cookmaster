const { findEmail } = require('../services/userServices');

const UN = 401;

async function validUser(email, password) {
  try {
    const user = await findEmail(email);
    if (user && user.password === password) {
      return true;
    }
    return false;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = async (req, res, next) => {
  const { email, password } = req.body;

  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const validEmail = regex.test(email);

  if (!email || !password) {
    return res.status(UN).send({
      message: 'All fields must be filled',
    });
  }
  if (!validEmail) {
    return res.status(UN).send({
      message: 'Incorrect username or password',
    });
  }
  const valid = await validUser(email, password);
  if (valid !== true) return res.status(UN).send({ message: 'Incorrect username or password' });
  next();
};