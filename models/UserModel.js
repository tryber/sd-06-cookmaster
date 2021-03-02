const connection = require('./connection');

const getAll = async () => {
  const allUsers = await connection()
    .then((db) => db.collection('users').find().toArray());
  return allUsers;
};

const create = async (name, email, password, role) => {
  const verRole = (e) => (e || 'user');  
  const created = await connection()
    .then((db) => 
      db.collection('users').insertOne({ name, email, password, role: verRole(role) }));
  return created;
};

const verifyEmail = async (email) => {
  const verify = await connection().then((db) => db.collection('users').findOne({ email }));
  console.log(verify);
  if (verify) return true;
  return false;
};

module.exports = {
  getAll,
  create,
  verifyEmail,
};