const connection = require('./connection');

const findByemail = async (email) => {
  const emailDb = await connection().then((db) => db.collection('users').find({ email })
  .toArray());
  return emailDb;
};

module.exports = {
  findByemail,
};
