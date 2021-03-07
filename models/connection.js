const { MongoClient } = require('mongodb');

const DB_NAME = 'Cookmaster';
const MONGODB_URL = 'mongodb://mongodb:27017/Cookmaster';
const connection = () => MongoClient.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.error(err);
      process.exit();
    });

module.exports = connection;