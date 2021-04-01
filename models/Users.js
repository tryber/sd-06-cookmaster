const connection = require('./connection');

const getAll = async () => connection().then((db) => db.collection('users').find().toArray());

// No banco um usuário precisa ter os campos Email, Senha, Nome e Role.
const create = async (name, email, password, role) => 
  connection().then((db) => db.collection('users').insertOne({ name, email, password, role }));

const getByEmail = async (email) =>
  connection().then((db) => db.collection('users').findOne({ email }));

const getByEmailAndPassword = async (email, password) =>
  connection().then((db) => db.collection('users').findOne({ email, password }));

module.exports = {
  getAll,
  create,
  getByEmail,
  getByEmailAndPassword,
};