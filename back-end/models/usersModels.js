const connection = require('./connection');

const collection = 'users';

// const baseStructure = {
//   name: 'Erick Jacquin',
//   email: 'erickjacquin@gmail.com',
//   password: '12345678',
//   role: 'user',
// };

// const baseResponse = { 
//   _id: ObjectId('5f46914677df66035f61a355'),
//   name: 'Erick Jacquin',
//   email: 'erickjacquin@gmail.com',
//   password: '12345678',
//   role: 'user',
// };

const registerUser = async () => {
  const responsePayload = 'users Model - register User';
  return responsePayload;
};

const registerAdmin = async () => {
  const responsePayload = 'users Model - register Admin';
  return responsePayload;
};

const userLogin = async () => {
  const responsePayload = 'users Model - user Login';
  return responsePayload;
};

module.exports = { registerUser, userLogin, registerAdmin };
