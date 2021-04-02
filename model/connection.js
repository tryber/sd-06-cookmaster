const { MongoClient } = require('mongodb');

const DB_NAME = 'Cookmaster';
const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';

// const MONGO_DB_URL = `mongodb+srv://store:macbook@cluster0.m9kzj.mongodb.net/
// test?authSource=admin&replicaSet=atlas-kq29l2-shard-0&
// readPreference=primary&appname=MongoDB%20Compass&ssl=true`;

let connection;

const getCollection = async (collectionName) => {
  connection = connection || await MongoClient.connect(
    MONGO_DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  );

  return connection.db(DB_NAME).collection(collectionName);
};

module.exports = { getCollection };
