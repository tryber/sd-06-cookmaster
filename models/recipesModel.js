const { ObjectId } = require('mongodb');
const { getCollection } = require('./connection');

const getAll = async () => 
  getCollection('recipes').then((db) => db.find({}).toArray());

const getByRecipeName = async (name) => 
  getCollection('recipes').then((db) => db.findOne({ name }));

const getById = async (id) => 
  getCollection('recipes').then((db) => db.findOne({ _id: ObjectId(id) }));

const create = async ({ name, ingredients, preparation }) => 
  getCollection('recipes').then((db) => db.insertOne({ name, ingredients, preparation }));

const edit = async (name, ingredients, preparation, id) => 
  getCollection('recipes').then((db) => db.updateOne(
    { _id: ObjectId(id) }, { $set: { name, ingredients, preparation } },
  ));
  
const exclude = async (id) => 
  getCollection('recipes').then((db) => db.deleteOne({ _id: ObjectId(id) }));

module.exports = { create, getAll, getByRecipeName, getById, edit, exclude };