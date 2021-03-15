const connection = require('./connection');

const queryByEmail = async (collection, email) => {
  const db = await connection(collection);
  return db.findOne({ email });
};

module.exports = {
  queryByEmail,
};
