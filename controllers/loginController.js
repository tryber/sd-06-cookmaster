const services = require('../services/loginServices');
const { OK } = require('../utils/statusCode');

const authenticateUser = async (req, res, next) => {
  try {
    const userCredentials = req.body;
    const token = await services.authenticateUser(userCredentials);

    res.status(OK).json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = { authenticateUser };
