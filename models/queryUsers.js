const connection = require('./connection');
// const { ObjectId } = require('mongodb');

const createUsers = async ({ name, email, role, password }) => connection()
.then((db) => db.collection('user').insertOne(
    { name, email, role, password },
  ));

const findByemail = async (email) => connection().then((db) => db.collection('user').findOne(
  { email },
));

const getUsers = async () => connection().then((db) => db.collection('user').find().toArray());

// db.user.find({ 'user.email': { $exists: 'fulano.silva@gmail.com'  } })

module.exports = {
  createUsers,
  findByemail,
  getUsers,
};
