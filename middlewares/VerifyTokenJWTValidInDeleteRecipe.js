const { status, messages } = require('../util/dataStatus');

const validateToken = require('../util/validTokenJWT');

// RES 
const { unauthorized } = status;
const { MissingAuthToken } = messages;

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) return res.status(unauthorized).json(MissingAuthToken);
    
    const user = validateToken(authorization);

    if (!user) {
        return res.status(unauthorized).json(MissingAuthToken);
    }

    next();
};