const { users } = require('../../services');

module.exports = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await users.createUser(body);
    return res.status(201).json({ user });
  } catch (err) {
    return next(err);
  }
};
