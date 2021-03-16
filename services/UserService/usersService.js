const Users = require('../../models/userModel');

const createOne = async (User) => {
  const insertedId = await Users.createOne(User);
  return insertedId;
};

const findOneById = async (id) => {
  const UserData = await Users.findOne(id);
  return UserData;
};

const findAll = async () => Users.findAll();

const updateOne = async (id, User) => {
  await Users.updateOne(id, User);
};

const deleteOne = async (id) => Users.deleteOne(id);

module.exports = {
  createOne, findOneById, findAll, updateOne, deleteOne,
};
