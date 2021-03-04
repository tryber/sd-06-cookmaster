const connection = require('../database/connection');

const validateUser = (email, password) => connection()
    .then((db) => db.collection('users').findOne(
      {
        $and: [
          { email },
          { password },
        ],
      },
    ))
    .then((res) => res)
    .catch((err) => console.error(err));

module.exports = {
  validateUser,
};