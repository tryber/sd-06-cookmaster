const jwt = require('jsonwebtoken');

const GenerateUserToken = async (_req, res, next) => {
  const usersSecret = 'aroldinho'; 
  const headers = {
    algorithm: 'HS256',
    expiresIn: '7m',
  };
  const { email, id, role } = res.locals.user;
  
  const token = jwt.sign({ email, id, role }, usersSecret, headers);  
  res.locals.token = token;
  next();
};

module.exports = {
  GenerateUserToken,
};