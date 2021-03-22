const connection = require('./connection');
// const { ObjectId } = require('mongodb');

const createUsers = async (user) => connection().then((db) => db.collection('user').insertOne(
    { user },
  ));

const findByemail = async (email) => connection().then((db) => db.collection('user').findOne(
  { 'user.email': { $exists: email } },
));

// db.user.find({ 'user.email': { $exists: 'fulano.silva@gmail.com'  } })

module.exports = {
  createUsers,
  findByemail,
};
