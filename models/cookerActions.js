const connection = require('./connection');

const createCooker = async (email, name, password) => 
  connection().then((db) => db.collection('users').insertOne({ email, name, password }));

module.exports = { createCooker };
