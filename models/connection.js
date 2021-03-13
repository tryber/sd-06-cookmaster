const { MongoClient } = require('mongodb');

// const URLLOCAL = 'mongodb://localhost:27017/Cookmaster';

const URLLOCAL = 'mongodb://mongodb:27017/Cookmaster';

const DB_NAME = 'Cookmaster';

const connection = () => MongoClient
    .connect(URLLOCAL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

module.exports = connection;