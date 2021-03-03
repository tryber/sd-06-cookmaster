const connection = require('./connection');
const Err = require('../errors/Err');

const collectionName = 'users';

class Users {
  async create({ name, email, password, role }) {
    try {
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
    } catch (err) {
      throw new Err();
    }
  }

  async findByEmail(email) {
    try {
      const db = connection();
      console.log(this);
      const user = await db.collection(collectionName).findOne({ email });
      return user;
    } catch (err) {
      throw new Err();
    } 
  }
}

module.exports = Users;