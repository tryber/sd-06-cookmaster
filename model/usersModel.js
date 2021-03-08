const getConnection = require('./connection');

const getAll = async () => {
  const listUsers = await getConnection('users').then((db) => db.find().toArray());
  return ({ user: listUsers });
};

const createUsers = async (name, email, password, role = 'user') => {
  const { insertedId } = await getConnection('users').then((db) => db.insertOne({
     name, email, password, role }));

  const usersRegister = {
    name,
    email,
    password,
    role,
    _id: insertedId,
    };

    return ({ user: usersRegister });
};

const findEmail = async (email) => {
  const resultFindEmail = await getConnection('users').then((db) => db.findOne({ email }));
  return resultFindEmail;
};

module.exports = {
  createUsers,
  findEmail,
  getAll,
};