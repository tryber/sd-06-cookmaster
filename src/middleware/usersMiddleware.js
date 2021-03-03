const {
  validationUsersKeysFormat,
  validationUsersEmailConflict,
} = require('../validations/usersValidations');

const {
  objMessageError,
} = require('../useful/funcsObjUseful');

const validationUsersBody = async (req, res, next) => {
  const { body } = req;

  const error = validationUsersKeysFormat(body);
  if (error) {
    const { message, status } = error;
    return res.status(status).json(objMessageError(message));
  }

  const error2 = await validationUsersEmailConflict(body);
  if (error2) {
    const { message, status } = error2;
    return res.status(status).json(objMessageError(message));
  }

  next();
};

module.exports = {
  validationUsersBody,
};
