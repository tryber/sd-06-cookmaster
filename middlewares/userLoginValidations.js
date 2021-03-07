const { status, messages } = require('../util/dataStatus');
const { validateEmail, validPassword, validateEmailExist } = require('./UtilFunctions');
const { findRegisterByEmail } = require('../models/modelsUsers');

// RES 
const { unauthorized } = status;
const { fieldsFilled, invalidLogin } = messages;

const userLoginValidation = async (req, res, next) => {
    const { email, password } = req.body;
    
    // Validations
    if (
        !validateEmailExist(email)
        || !validPassword(password)) return res.status(unauthorized).json(fieldsFilled);
    if (!validateEmail(email)) return res.status(unauthorized).json(invalidLogin);

    const resultEmailInServer = await findRegisterByEmail(email);
    if (!resultEmailInServer) return res.status(unauthorized).json(invalidLogin);
    if (resultEmailInServer.email !== email,
        resultEmailInServer.password !== password
        ) return res.status(unauthorized).json(invalidLogin);

    // Go to Services
    next();
};

module.exports = {
    userLoginValidation,
};