const connection = require('./connection');

const createCooker = async (name, email, password) =>
  connection().then((db) => db.collection('users').insertOne(
    { name, email, password, role: 'user' },
  ));

const findCookerByEmail = async (email) =>
  connection().then((db) => db.collection('users').findOne({ email }));

module.exports = {
  createCooker,
  findCookerByEmail,
};
