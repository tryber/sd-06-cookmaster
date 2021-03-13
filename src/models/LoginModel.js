const conn = require('../utils/connection');

const checkEmailAndPassword = async (email, password) => conn()
.then((db) => db.collection('users').findOne({ email, password }));

module.exports = {
  checkEmailAndPassword,
};