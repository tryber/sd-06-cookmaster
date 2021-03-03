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

  const emailAlreadyExistsService = async (req, _res, next) => {
    const { email } = req.body;
    const emailExists = await emailAlreadyExists(email);
    if (emailExists) {
 return next({
        status: 409,  
        message: 'Email already registered',
      }); 
}
    next();
  };
// loginValidators
  const validateEntriesLogin = (req, _res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
 return next({
        status: 401,  
        message: 'All fields must be filled',
      }); 
}
    next();
  };

  const validateEmailLogin = (req, _res, next) => {
    const { email } = req.body;
    const emailTest = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailTest.test(email)) {
 return next({
        status: 401,  
        message: 'Incorrect username or password',
      }); 
}
    next();
  };

  const validatePasswordLogin = async (req, _res, next) => {
    const { email, password } = req.body;
    const emailExists = await emailAlreadyExists(email);

    if (!emailExists || emailExists.password !== password) {
 return next({
        status: 401,  
        message: 'Incorrect username or password',
      }); 
}
    next();
  };

module.exports = {
    validateEntries,
    validateEmail,
    emailAlreadyExistsService,
    validateEntriesLogin,
    validateEmailLogin,
    validatePasswordLogin,
  };