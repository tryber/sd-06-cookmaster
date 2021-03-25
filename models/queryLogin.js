const connection = require('./connection');
// const { ObjectId } = require('mongodb');

// const findByemail = async (email) => connection().then((db) => db.collection('users').findOne(
//   { email },
// ));

const findByemail = async (email) => connection().then((db) => db.collection('users').find(
  { email },
).toArray());

// db.user.find({ 'user.email': { $exists: 'fulano.silva@gmail.com'  } })

module.exports = {
  findByemail,
};
