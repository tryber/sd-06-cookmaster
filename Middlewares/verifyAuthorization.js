const jwt = require('jsonwebtoken');
// const { emailAlreadyExists } = require('../Models/users');

const mySecretKey = 'Hey-Ho!';

module.exports = async (req, res, next) => {
    const errorMsg = 'jwt malformed';

    const { authorization: token } = req.headers;    
    if (!token) return res.status(401).json({ message: 'missing auth token' });
    
    try {
    const user = jwt.verify(token, mySecretKey);
    // console.log(verifyToken);
    // const user = await emailAlreadyExists(verifyToken.email);
    // if (!user) return res.status(401).json({ message: errorMsg });
    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ message: errorMsg });
  }
};