const { users } = require('../../services');

module.exports = async (req, res, next) => {
  try {
    const { body, user } = req;
    const admin = await users.createAdmin(body, user);
    return res.status(201).json({ user: admin });
  } catch (err) {
    return next(err);
  }
};
