// const { ObjectId } = require('mongodb');
const connection = require('./connection');

// const getAll = async () =>
//   connection()
//     .then((db) => db.collection('sales').find().toArray());

// const findById = async (id) =>
//   connection().then((db) => db.collection('sales').findOne(ObjectId(id)));

const findByEmail = async (email) => 
  connection().then((db) => db.collection('users').findOne({ email }));

const create = async ({ name, email, password }) =>
  connection()
    .then((db) =>
      db.collection('users').insertOne({
        name,
        email,
        password,
        role: 'user',
      })) 
    .then((result) => result);

// const update = async (id, newSale) =>
//   connection()
//     .then((db) => db.collection('sales').findOneAndUpdate(
//       { _id: ObjectId(id) },
//       { $set: {
//         itensSold: newSale,
//       } },
//       { returnOriginal: false },
//     ))
//     .then((result) => result.value);

// const deleteSale = async (id) => 
//   connection()
//     .then((db) => db.collection('sales').findOneAndDelete(
//       { _id: ObjectId(id) },
//     ))
//     .then((result) => result.value);

module.exports = {
  // getAll,
  // findById,
  // findByName,
  create,
  findByEmail,
  // update,
  // deleteSale,
};