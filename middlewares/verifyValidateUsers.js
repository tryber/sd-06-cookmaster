// const { ObjectId } = require('mongodb');
const usersServices = require('../services/usersServices');

const msg = 'Invalid entries. Try again.';
const code = 400;

async function verifyEmailExists(request, response, next) {
  const { email } = request.body;
  const existNameReturn = await usersServices.findEmailExist(email);
  console.log('userValidate', existNameReturn);
  if (existNameReturn) {
    return response.status(409)
      .json({ message: 'Email already registered' }); 
}
  next();
}
// js considera falso quando - false, string vazia (''), undefined, null, zero (0)
function verifyEmail(request, response, next) {
  const { email } = request.body;
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  if (!regex.test(email)) {
 return response.status(code)
  .json({ message: msg }); 
}
  next();
}

function verifyUsers(request, response, next) {
  const { name, email, password } = request.body;
  if (!name || !email || !password) {
    return response.status(code)
    .json({ message: msg });
  }
  
  next(); 
  // esta passando quando é quando coloco qualquer coisa e não passa se não existir o ccmpo role
}
module.exports = {
  verifyEmailExists,
  verifyEmail,
  verifyUsers,
};
