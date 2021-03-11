const { ObjectId } = require('mongodb');
const connection = require('./connection');

async function getAll() {
  const db = await connection();
  const queryResult = await db
    .collection('users')
    .find()
    .toArray();
  
  return queryResult;
}

async function findById(id) {
  const db = await connection();
  const queryResult = await db
    .collection('users')
    .findOne(ObjectId(id));

  return queryResult;
}

async function findByEmail(email) {
  const db = await connection();
  const queryResult = await db
    .collection('users')
    .findOne(
      { email },
    );

  return queryResult;
}

async function update(id, newDataFromUser) {
  const { name, email, password, role } = newDataFromUser;
  const db = await connection();
  const queryResult = await db
    .collection('users')
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { name, email, password, role } },
      { returnOriginal: false },
    );

    console.log(queryResult);

    if (!queryResult.value) return null;

    return queryResult.value;
}

async function create(name, email, password, role) {
  const db = await connection();
  const { insertedId } = await db
    .collection('users')
    .insertOne({ name, email, password, role });

  return {
    user: {
      name,
      email,
      role,
      _id: insertedId,
    },
  };
}

async function remove(id) {
  const db = await connection();
  const queryResult = await db
    .collection('users')
    .findOneAndDelete(
      { _id: ObjectId(id) },
    );
  
  if (!queryResult.value) return null;
  
  return queryResult.value;
}

module.exports = {
  getAll,
  findById,
  findByEmail,
  update,
  create,
  remove,
};
