const { ObjectId } = require('mongodb');

const connection = require('../connection');

const createUser = async (newUser) => {
  console.log('USERS - MODEL');
  const chavesUser = Object.keys(newUser);
  const includesRole = chavesUser.includes('role');
  const user = newUser;
  if (!includesRole) user.role = 'user';

  const { insertedId } = await connection()
    .then((db) => db.collection('users').insertOne(user));
  console.log('INSERTED ID', insertedId);
  return {
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
      _id: insertedId,
    },
  };
};

const createAdmin = async (newUser) => {
  console.log('USERS - MODEL');
  const { name, email } = newUser;
  const user = { name, email, role: 'admin' };

  const { insertedId } = await connection()
    .then((db) => db.collection('users').insertOne(user));
  console.log('INSERTED ID', insertedId);
  return {
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
      _id: insertedId,
    },
  };
};

const findByEmail = async (email) => {
  const result = await connection()
    .then((db) => db.collection('users').findOne({ email }));

  console.log('USER BY EMAIL MODEL USERS', result);
  return result;
};

const findById = async (id) => {
  console.log('FIND USER PELO ID');
  console.log('Id do usuario', id);
  const result = await connection()
    .then((db) => db.collection('users').findOne({ _id: ObjectId(id) }));
  console.log('RESULTADO do find by id do usuario', result);
  return result;
};

module.exports = {
  createUser,
  findByEmail,
  findById,
  createAdmin,
};
