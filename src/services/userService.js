/* eslint-disable max-lines-per-function */
const { ObjectId } = require('mongodb');
const { getAllUsers } = require('../models/userModel');

const UNPROCESSABLE_ENTITY = 422;
const NOT_FOUND = 400;
const invalid = 'Invalid entries. Try again.';
const CONFLICT = 409;
// /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;

function validateEmail(email) {
    const re = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
    return re.test(String(email).toLowerCase());
  }

async function setValidation(req, res, next) {
  const { name, email, password } = req.body;

  if (!name || name === '' || name === null) {
    return res.status(NOT_FOUND).json(
        {
          err: {
            message: invalid,
          },
        },
      );
  }

  if (!email || email === '' || email === null) {
    return res.status(NOT_FOUND).json(
      {
        err: {
          message: invalid,
        },
      },
    );
  }

  if (!validateEmail(email)) {
    return res.status(400).json(
      {
        err: {
          message: invalid,
        },
      },
    );
  }

  if (!password || password === '' || password === null) {
    return res.status(NOT_FOUND).json(
      {
        err: {
          message: invalid,
        },
      },
    );
  }
  next();
}

async function setValidationID(req, res, next) {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
 return res.status(UNPROCESSABLE_ENTITY).json(
    {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    },
  ); 
}
  next();
}

async function ifExist(req, res, next) {
  const { email } = req.body;
  const user = await getAllUsers();
  const finduser = await user.find((item) => item.email === email);

  if (finduser) {
    return res.status(CONFLICT).json(
      {
        err: {
          message: invalid,
        },
      },
    );
  }
  next();
}

module.exports = {
  ifExist,
  setValidation,
  setValidationID,
};
