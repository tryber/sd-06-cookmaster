const jwt = require('jsonwebtoken');
const { emailAlreadyExists } = require('../Models/users');

const mySecretKey = 'Hey-Ho!';

module.exports = async (req, res, next) => {
    const { authorization: token } = req.headers;    
    if (!token) return res.status(401).json({ message: 'missing auth token' });
    
    try {
    const verifyToken = jwt.verify(token, mySecretKey);
    const userAdmin = await emailAlreadyExists(verifyToken.email);
        if (!userAdmin.role === 'admin') {
 return res.status(401)
         .json({ message: 'You have to be an admin to change a recipe' }); 
}
    req.userAdmin = userAdmin;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'erro interno' });
 }
};