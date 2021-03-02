const { MongoClient } = require('mongodb');

const MONGODB_URL = 'mongodb://localhost:27017/Cookmaster'; // Local
// const MONGODB_URL = 'mongodb://mongodb:27017/Cookmaster'; // Evaluator
const DATABASE = 'Cookmaster';

const connection = async () => MongoClient.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => conn.db(DATABASE))
    .catch(() => {
      process.exit();
    });

module.exports = connection;
