const { status, messages } = require('../util/dataStatus');

const validateToken = require('../util/validTokenJWT');
const { validUsername, validIngredients, validPreparation } = require('./UtilFunctions');

// RES 
const { badRequest, unauthorized } = status;
const { invalidEntries, JWTMalformed } = messages;

module.exports = (req, res, next) => {
    const { name, ingredients, preparation } = req.body;
    const { authorization } = req.headers;

    const user = validateToken(authorization);

    if (!user) {
        return res.status(unauthorized).json(JWTMalformed);
    }

    if (
     !validUsername(name)
     || !validIngredients(ingredients)
     || !validPreparation(preparation)) return res.status(badRequest).json(invalidEntries);

    next();
};