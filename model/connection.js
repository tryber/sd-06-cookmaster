const { MongoClient } = require('mongodb');

const DB_NAME = 'Cookmaster';
const MONGO_DB_URI = 'mongodb://mongodb:27017/Cookmaster';
// const MONGO_DB_URI = 'mongodb+srv://store:macbook@cluster0.m9kzj.mongodb.net/test?'
//   + 'authSource=admin&replicaSet=atlas-kq29l2-shard-0&readPreference'
//   + '=primary&appname=MongoDB%20Compass&ssl=true';

let connection;

const getCollection = async (collectionName) => {
  const connect = await MongoClient.connect(
    MONGO_DB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  );

  connection = connect || connection;
  
  return connection.db(DB_NAME).collection(collectionName);
};

module.exports = { getCollection };
