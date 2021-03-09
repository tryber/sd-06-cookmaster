const connection = require('../models/connections');
// const { ObjectId } = require('mongodb');

const collectionName = 'users';

const getAll = async () => connection()
  .then((db) => db.collection(collectionName).find().toArray());

// const findById = async (id) => {
//   const product = await connection()
//     .then((db) => db.collection(collectionName).findOne(ObjectId(id)))
//     .catch(err => err.message);

//   if (!product || typeof product !== 'object') return null;

//   return product;
// };

const create = async (name, email, password) => connection()
  .then((db) => db.collection(collectionName).insertOne({ name, email, password, role: 'user' }));

// const update = async (id, name, quantity) => {
//   return await connection()
//     .then((db) => db.collection(collectionName)
//       .updateOne(
//         { id: ObjectId(id) },
//         { $set: { 'name': name, 'quantity': quantity } }
//       ));
// };

// const deleteProduct = async (id) => {
//   return await connection()
//     .then((db) => db.collection(collectionName).deleteOne({ _id: ObjectId(id) }));
// };

module.exports = {
  getAll,
  // findById,
  create,
  // update,
  // deleteProduct
};