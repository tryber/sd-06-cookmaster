const { errMsgs, statusCode } = require('../Dicio');

function validEmail(email, response) {
    // regex do AppReceitas e da Atividade de 05 fev 2021:
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    // segundo mdn [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test]
    if (!regexEmail.test(email)) {
      return response.status(statusCode.BAD_REQUEST)
      .json({ message: errMsgs.tryAgain }); 
    }
}

module.exports = validEmail;