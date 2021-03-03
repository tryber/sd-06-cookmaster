const { session } = require('../../services');

module.exports = async (req, res, next) => {
  try {
    const { body } = req;
    const token = await session.login(body);
    return res.status(200).json({ token });
  } catch (err) {
    return next(err);
  }
};
