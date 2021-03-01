const { INVALID_ENTRIES } = require('../errors/messagesErrors');

const BAD_REQUEST = 400;
const regexValiditEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

const validateProduts = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (name === undefined || email === undefined || password === undefined) {
    return res.status(BAD_REQUEST).json({ message: INVALID_ENTRIES });
  }

  if (!regexValiditEmail.test(email)) {
    return res.status(BAD_REQUEST).send({ message: INVALID_ENTRIES });
  }

  if (password === '') {
    return res.status(BAD_REQUEST).json({ message: INVALID_ENTRIES });
  }

  next();
};

module.exports = validateProduts;
