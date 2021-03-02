const mongodb = require('mongodb');

const connection = require('../index.js');

const collectionName = 'users';

class User {
  constructor() {
    this.connection = connection;
  }

  async create({ name, email, password, role }) {
    const db = await this.connection();

    const newUser = {
      name,
      email,
      password,
      role,
    };

    const queryInfo = await db.collection(collectionName).insertOne(newUser);

    const [createdUser] = queryInfo.ops;

    return createdUser;
  }

  async listAll() {
    const db = await this.connection();

    const users = await db.collection(collectionName).find().toArray();

    return users;
  }

  async findByID(id) {
    const db = await this.connection();

    const user = await db.collection(collectionName).findOne(mongodb.ObjectId(id));

    return user;
  }

  async findByEmail(email) {
    const db = await this.connection();

    const user = await db.collection(collectionName).findOne({ email });

    return user;
  }

  async update({ id, itensSold }) {
    const db = await this.connection();

    const newSale = {
      itensSold,
    };

    await db.collection(collectionName).updateOne(
      { _id: mongodb.ObjectId(id) },
      { $set: newSale },
    );

    const updatedInfo = await db.collection(collectionName).findOne(mongodb.ObjectId(id));

    return updatedInfo;
  }

  async deleteByID(userID) {
    const db = await this.connection();

    await db.collection(collectionName).deleteOne(
      { _id: mongodb.ObjectId(userID) },
    );
  }
}

module.exports = User;
