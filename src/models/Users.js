const connection = require('./Connection');

exports.findByEmail = async (email) => (
  connection().then(
    (db) => db.collection('users').findOne({ email }),
  )
);

exports.create = async (name, email, password, admin) => {
  const result = await connection().then(
    (db) => db.collection('users').insertOne(
      { name, email, password, role: admin || 'user' },
    ),
  );

  return result.ops[0];
};
