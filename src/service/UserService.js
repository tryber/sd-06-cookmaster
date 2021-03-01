const User = require('../models/Users');

exports.findByEmail = async (email) => User.findByEmail(email);

exports.create = async (name, email, password) => (
  User.create(name, email, password)
);
