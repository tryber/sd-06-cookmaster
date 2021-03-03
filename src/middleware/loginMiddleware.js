const {
  validationLoginKeysExists,
  validationLoginUserExists,
} = require('../validations/loginValidations');

const { objMessageError } = require('./usefulFuncsMiddleware');

const loginUserValid = async (req, res, next) => {
  const { body } = req;

  const error = validationLoginKeysExists(body);
  if (error) {
    const { message, status } = error;
    return res.status(status).json(objMessageError(message));
  }
  
  const error2 = await validationLoginUserExists(body, res);
  if (error2) {
    const { message, status } = error2;
    return res.status(status).json(objMessageError(message));
  }

  next();
};

module.exports = {
  loginUserValid,
};
