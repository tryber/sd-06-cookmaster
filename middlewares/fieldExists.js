const { errMsgs, statusCode } = require('../Dicio');

function fieldExists(name, email, password, response) {
  if (!name || !email || !password) {
  return response.status(statusCode.BAD_REQUEST).json(
    { message: errMsgs.tryAgain },
    ); 
  } 
}

module.exports = fieldExists;