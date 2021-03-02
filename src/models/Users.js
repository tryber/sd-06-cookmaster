const { ObjectID } = require('mongodb');
const connection = require('./connections');

const create = async (name, email, password) => {
  const role = 'user';
  const { insertedId } = connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }));
  return {
    user: {
      name,
      email,
      role,
      _id: insertedId,
    },
  };
};

const getAll = async () => connection().then((db) => db.collection('users').find().toArray());

const findByEmail = async (email) => connection()
  .then((db) => db.collection('users').findOne({ email }));

const findById = async (id) => connection()
  .then((db) => db.collection('users').findOne(ObjectID(id)));

const update = async (id, name, quantity) => {
  connection().then((db) => db.collection('users').updateOne(
    { _id: ObjectID(id) },
    { $set: { name, quantity } },
  ));

  return {
    _id: id,
    name,
    quantity,
  };
};

const remove = async (id) => connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectID(id) }));

module.exports = {
  create,
  findByEmail,
  getAll,
  findById,
  update,
  remove,
}; 