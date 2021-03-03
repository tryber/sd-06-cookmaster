const { MongoClient } = require('mongodb');

// avaliador 
const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';

// local
// const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

let keepConnection = null;
const connection = async () => { 
  keepConnection = keepConnection || await MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return keepConnection.db(DB_NAME);
};

module.exports = connection;