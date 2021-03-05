// const { ObjectId } = require('mongodb');
const getCollection = require('./connection');

const getAll = async () => 
  getCollection('recipes').then((db) => db.find({}).toArray());

const getByRecipeName = async (name) => 
  getCollection('recipes').then((db) => db.findOne({ name }));

const create = async ({ name, ingredients, preparation }) => 
  getCollection('recipes').then((db) => db.insertOne({ name, ingredients, preparation }));

module.exports = { create, getAll, getByRecipeName };