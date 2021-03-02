const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => connection().then((db) => db.collection('recipes').find().toArray());

const create = async (name, ingredients, preparation) => connection().then((db) => 
  db.collection('recipes').insertOne({ name, ingredients, preparation }));
//

// 5
const getById = async (id) => connection().then((db) => 
    db.collection('recipes').findOne({ _id: ObjectId(id) }));
// 5

module.exports = {
  getAll,
  create,
  getById,  
};