// const model = require('../../models/modelUsers');

const checkLogin = async (req, res, next) => {
  const UNAUTHORIZED = 401;
  const { email, password } = req.body;
  
  if (!email || !password) {
    return next(UNAUTHORIZED, { message: 'All fields must be filled' });
  } 
   next();
 };

module.exports = checkLogin;
