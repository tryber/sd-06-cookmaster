const { ObjectId } = require('mongodb');
const connection = require('./connection');

const insertToDb = async (collection, data) => {
  const db = await connection(collection);
  const result = await db.insertOne(data);
  return result.ops[0];
};

const queryFromDb = async (collection, id) => {
  try {
    const db = await connection(collection);
    return id
      ? await db.findOne({ _id: ObjectId(id) })
      : await db.find().toArray();
  } catch (err) {
    // console.error(err);
    return null;
  }
};

const updateDb = async (collection, id, data) => {
  const db = await connection(collection);
  return (await db.findOneAndUpdate(
    { _id: ObjectId(id) }, { $set: data }, { returnOriginal: false },
  )).value;
};

const deleteFromDb = async (collection, id) => {
  const db = await connection(collection);
  return (await db.findOneAndDelete({ _id: ObjectId(id) })).value;
};

module.exports = {
  insertToDb,
  queryFromDb,
  updateDb,
  deleteFromDb,
};