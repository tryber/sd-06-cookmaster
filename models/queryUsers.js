const connection = require('./connection');
// const { ObjectId } = require('mongodb');

const createUsers = async ({ name, email, password, role }) => connection()
.then((db) => db.collection('users').insertOne(
    { name, email, password, role },
  ));

const findByemail = async (email) => connection().then((db) => db.collection('users').findOne(
  { email },
));

const getUsers = async () => connection().then((db) => db.collection('users').find().toArray());

// db.user.find({ 'user.email': { $exists: 'fulano.silva@gmail.com'  } })

module.exports = {
  createUsers,
  findByemail,
  getUsers,
};
