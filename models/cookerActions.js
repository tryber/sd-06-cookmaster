const connection = require('./connection');

const createCooker = async (name, email, password) => 
  connection().then((db) => db.collection('users').insertOne({ name, email, password }));

module.exports = { createCooker };
