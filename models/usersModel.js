const connection = require('./connection');

const register = async (name, email, password) => {
  await connection().then((db) => db.collection('users').insertOne({ name, email, password, role: 'user' }));
  return { user: 'Cadastrado' }
}

const findByEmail = async (email) => {
  return await connection().then((db) => db.collection('users').findOne({ email }));

}

module.exports = { register, findByEmail };
