const connection = require('./connection');
// const { ObjectId } = require('mongodb');

const createUsers = async ({ name, email, password, role }) => {
 const newUser = await connection().then((db) => db.collection('users').insertOne(
    { name, email, password, role },
  ));
  return newUser;
};

const findByemail = async (email) => {
  const emailDb = await connection().then((db) => db.collection('users').findOne({ email }));
  return emailDb;
};

const getUsers = async () => {
  const userDb = await connection().then((db) => db.collection('users').find().toArray());
  return userDb;
};

// db.user.find({ 'user.email': { $exists: 'fulano.silva@gmail.com'  } })

module.exports = {
  createUsers,
  findByemail,
  getUsers,
};
