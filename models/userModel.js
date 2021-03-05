const getCollection = require('./connection');

const getAll = async () => 
  getCollection('users').then((db) => db.find({}).toArray());

const getByEmail = async (email) => 
  getCollection('users').then((db) => db.findOne({ email }));

const create = async ({ name, email, password, role }) => 
  getCollection('users').then((db) => db.insertOne({ name, email, password, role }));

module.exports = { create, getAll, getByEmail };