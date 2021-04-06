const connection = require('./connection');
const Err = require('../errors/Err');

const collectionName = 'users';
const errorMessage = 'Something went wrong';

class Users {
  async create({ name, email, password, role }) {
    try {
      const db = await connection();
      console.log(this);
      const { insertedId } = await db.collection(collectionName).insertOne({
        name,
        email,
        password,
        role,
      });
      return {
        _id: insertedId,
        name,
        email,
        role,
      };
    } catch (err) {
      throw new Err({ message: errorMessage });
    }
  }

  async findByEmail(email) {
    try {
      const db = await connection();
      console.log(this);
      const [user] = await db.collection(collectionName).find({ email }).toArray();
      console.log(user);
      return user;
    } catch (err) {
      throw new Err({ message: errorMessage });
    } 
  }
}

module.exports = Users;