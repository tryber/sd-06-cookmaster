const CookerActions = require('../models/cookerActions');

// no Majik NUMBER
const SUCCESS_CREATED = 201;
const BAD_REQUEST = 400;

// codeMessages
const errMsg = {
  tryAgain: 'Invalid entries. Try again.',
};

const creatingValidCooker = async (request, response) => {
  const { name, email, password } = request.body;

  if (!name || !email || !password) {
  return response.status(BAD_REQUEST)
    .json({ message: errMsg.tryAgain }); 
  }

  // regex do AppReceitas e da Atividade de 05 fev 2021:
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  // segundo mdn [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test]
  if (!regexEmail.test(email)) {
    return response.status(BAD_REQUEST)
    .json({ message: errMsg.tryAgain }); 
  }

  const { insertedId } = await CookerActions.createCooker(name, email, password);
  const newUser = {
    _id: insertedId,
    role: 'user',
    name,
    email,
    password,
  };
  return response.status(SUCCESS_CREATED).send(newUser);
};

module.exports = { creatingValidCooker };