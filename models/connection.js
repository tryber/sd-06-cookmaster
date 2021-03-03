const { MongoClient } = require('mongodb');

const MONGODB_URL = 'mongodb://mongodb:27017/Cookmaster';
const DATABASE = 'Cookmaster';

const connection = async () => {
  const result = await MongoClient.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => conn.db(DATABASE))
    .catch((err) => {
      console.error(err);
      process.exit(err);
    });
  return result;
};

module.exports = connection;
