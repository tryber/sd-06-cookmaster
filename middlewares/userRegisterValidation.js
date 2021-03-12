const { status, messages } = require('../util/dataStatus');
const { 
    validateEmail,
    validUsername,
    validPassword,
    validateEmailExist,
} = require('./UtilFunctions');

// RES 
const { badRequest } = status;
const { invalidEntries } = messages;

const userRegisterValidation = async (req, res, next) => {
    const { name, email, password } = req.body;

    // Validations
    if (!validUsername(name)
        || !validateEmail(email)
        || !validPassword(password)
        || !validateEmailExist(email)
    ) return res.status(badRequest).json(invalidEntries);

    // Go to Services
    next();
};

module.exports = {
    userRegisterValidation,
};