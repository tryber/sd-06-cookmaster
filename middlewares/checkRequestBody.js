const model = require('../models/usersModel');

const checkRequestBody = async (request, response, next) => {
  if (!request.body.name || !request.body.email || !request.body.password) {
    return response.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  
  const isEmailValid = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  if (!isEmailValid.test(request.body.email)) {
    return response.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  const isUnique = await model.isEmailUnique(request.body.email);

  if (!isUnique) {
    return response.status(409).json({ message: 'Email already registered' });
  }

  next();
};

module.exports = checkRequestBody;