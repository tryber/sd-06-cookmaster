const UsersModel = require('../models/usersModel');

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const emailValidation = async (req, res, next) => {
  const { email } = req.body;
  // console.log(email);
  const emailExists = await UsersModel.findByEmail(email);
  // console.log(emailExists);
  if (emailExists) {
    return res.status(409).json({
      message: 'Email already registered',
    });
  }

  if (!emailRegex.test(String(email).toLocaleLowerCase())) {
    return res.status(400).json({ message: 'Invalid entries. Try again.',
  });
  }

  next();
};

module.exports = {
  emailValidation,
};
