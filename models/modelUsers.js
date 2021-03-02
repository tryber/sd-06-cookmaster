const { ObjectId } = require('mongodb');

const getCollection = require('./connection');

const getAllUsers = async () => getCollection('users')
  .then((user) => user.find().toArray());

const getUserById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return getCollection('users').then((user) => user.findOne(ObjectId(id)));
};

const getByEmail = async ({ email }) => getCollection('users')
.then((mail) => mail.findOne({ email }));

const createUser = async ({ name, email, password, role }) => {
  const User = await getCollection('users').then((user) =>
    user.insertOne({ name, email, password, role }));

  return { _id: User.insertedId, name, email, password, role };
};

const updateUser = async ({ id, name, email, password, role }) => {
  if (!ObjectId.isValid(id)) return null;
  const User = await getCollection('users').then((user) =>
    user.updateOne({ _id: ObjectId(id) }, { $set: { name, email, password, role } }));

  return User;
};

const excludeUser = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return getCollection('users').then((user) => user.deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  getAllUsers,
  getUserById,
  getByEmail,
  createUser,
  updateUser,
  excludeUser,
};