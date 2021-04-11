const { MongoClient } = require('mongodb');

require('dotenv').config();

const MONGO_DB_URL = process.env.IS_LOCAL
  ? 'mongodb://localhost:27017/Cookmaster'
  : 'mongodb://mongodb:27017/Cookmaster';

const DB_NAME = 'Cookmaster';

const connection = () => MongoClient.connect(
    MONGO_DB_URL,
    {
      // userNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });

module.exports = connection;
