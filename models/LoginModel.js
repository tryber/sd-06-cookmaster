const connection = require('./connection');

const verifyEmail = async (email) => {
  const verify = await connection().then((db) => db.collection('users').findOne({ email }));
  if (!verify) return false;
  return verify;
};

module.exports = {
  verifyEmail,
};