const { statusCode, statusMsgs } = require('../Dicio');
const CookerActions = require('../models/cookerActions');

function fieldExists(request, response, next) {
  const { email, password } = request.body;
  if (!email || !password) {
  return response.status(statusCode.UNAUTHORIZED).json(
    { message: statusMsgs.emptyFields },
    ); 
  } 
  next();
}

async function validEmail(request, response, next) {
  const { email } = request.body;
  const isUser = await CookerActions.findCookerByEmail(email);
  
  if (!isUser) {
    return response.status(statusCode.UNAUTHORIZED)
    .json({ message: statusMsgs.loginError });
  }
  next();
}

async function validPassword(request, response, next) {
  const { email, password } = request.body;
  // já que o email é único ele vai funcionar como identificador
  const { password: passwordUser } = await CookerActions.findCookerByEmail(email);

  if (password !== passwordUser) {
    return response.status(statusCode.UNAUTHORIZED)
    .json({ message: statusMsgs.loginError }); 
  }
  next();
}

module.exports = {
  fieldExists,
  validEmail,
  validPassword,
};