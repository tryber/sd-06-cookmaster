const { statusCode, statusMsgs } = require('../Dicio');
const CookerActions = require('../models/cookerActions');

function fieldExists(request, response, next) {
  const { name, email, password } = request.body;
  if (!name || !email || !password) {
  return response.status(statusCode.BAD_REQUEST).json(
    { message: statusMsgs.tryAgain },
    ); 
  } 
  next();
}

function validEmail(request, response, next) {
  const { email } = request.body;
  // regex do AppReceitas e da Atividade de 05 fev 2021:
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  // segundo mdn [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test]
  if (!regexEmail.test(email)) {
    return response.status(statusCode.BAD_REQUEST)
    .json({ message: statusMsgs.tryAgain }); 
  }
  next();
}

async function emailReplicant(request, response, next) {
  const { email } = request.body;
  const isEmail = await CookerActions.findCookerByEmail(email);
  if (isEmail) {
    return response.status(statusCode.CONFLICT)
    .json({ message: statusMsgs.alreadyRegist });
  }
  next();
}

module.exports = {
  fieldExists,
  validEmail,
  emailReplicant,
};