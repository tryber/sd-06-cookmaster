// const bcrypt = require('bcryptjs');
const mongoose = require('./dataBase');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: true,
  },
  role: {
    type: String,
  },
});

const Users = mongoose.model('users', UserSchema);

module.exports = Users;
