const { emailAlreadyExists } = require('../Models/users');

const validateEntries = (req, _res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
 return next({
        status: 400,  
        message: 'Invalid entries. Try again.',
      }); 
}
    next();
  };

  const validateEmail = (req, _res, next) => {
    const { email } = req.body;
    const emailTest = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailTest.test(email)) {
 return next({
        status: 400,  
        message: 'Invalid entries. Try again.',
      }); 
}
    next();
  };

  const emailAlreadyExistsService = (req, _res, next) => {
    const { email } = req.body;
    const emailExists = emailAlreadyExists(email);
    if (emailExists) {
 return next({
        status: 409,  
        message: 'Email already registered',
      }); 
}
    next();
  };

module.exports = {
    validateEntries,
    validateEmail,
    emailAlreadyExistsService,
  };