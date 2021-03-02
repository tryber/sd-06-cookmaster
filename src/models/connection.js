const { MongoClient } = require('mongodb');

const MONGODB_URL = 'mongodb://mongodb:27017/Cookmaster';
// const MONGODB_URL = 'mongodb://localhost:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

const connection = () => { 
  const mongoConnection = MongoClient.connect(MONGODB_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
  })
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => { 
      console.error(err);
      process.exit();
    });
  return mongoConnection;
};

module.exports = connection;