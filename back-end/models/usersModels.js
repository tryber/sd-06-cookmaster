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

const registerUser = async (name, email, password, role) => {
  const responsePayload = await connection().then((db) => 
    db.collection(collection).insertOne({ name, email, password, role }));
  return responsePayload;
};

const findUserByEmail = async (email) => {
  const responsePayload = await connection().then((db) => 
    db.collection(collection).findOne({ email }));
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

module.exports = { registerUser, userLogin, registerAdmin, findUserByEmail };
