const connection = require('./connection');

const collectionName = 'users';

class Users {
  async create({ name, email, password, role }) {
    const db = await connection();
    console.log(this);
    const { insertedId } = db.collection(collectionName).insertOne({
      name,
      email,
      password,
      role,
    });
    return {
      id: insertedId,
      name,
      email,
      role,
    };
  }
}

module.exports = Users;