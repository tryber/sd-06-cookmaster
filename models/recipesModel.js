const { ObjectID } = require('mongodb');
const connection = require('./connection');

const create = async (recipe) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes').insertOne(recipe))
    .catch((err) => {
      console.log(err);
      throw new Error(err);
    });

  return { recipe: { _id: insertedId, ...recipe } };
};

const findEmail = async (email) => {
  const result = await connection()
    .then((db) => db.collection('users').findOne({ email }))
    .catch((err) => {
      console.error(err);
      throw new Error(err);
    });

  return result;
};

const getAll = async () => {
  try {
    const result = await connection()
      .then((db) => db.collection('recipes').find().toArray());

    return result;
  } catch (e) {
    throw new Error(e);
  }
};

const findId = async (id) => {
  try {
    const validId = ObjectID.isValid(id);
    if (validId === false) return validId;
    const result = await connection()
      .then((db) => db.collection('products').findOne(ObjectID(id)));

    return result;
  } catch (e) {
    throw new Error(e);
  }
};

const update = async (product) => {
  try {
    const { id } = product;
    const validId = ObjectID.isValid(id);
    if (validId === false) return validId;
    await connection()
      .then((db) => db.collection('products')
        .updateOne({ _id: ObjectID(id) }, { $set: {
          name: product.name, quantity: product.quantity,
        } }));

    return product;
  } catch (e) {
    throw new Error(e);
  }
};

const remove = async (id) => {
  try {
    return await connection()
      .then((db) => db.collection('products').deleteOne({ _id: ObjectID(id) }));
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  create,
  findEmail,
  findId,
  getAll,
  update,
  remove,
};
