import mongoose, { Schema } from 'mongoose'

const usersSchema = new Schema({
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    uppercase: false,
    index: true,
    trim: true,
    required: true
  },
  role: {
      type: String,
      default: "user",
      enum: ["user", "admin"]
  }
})

const Users = mongoose.model('Users', usersSchema)


export const getAll = function() {
  return new Promise((resolve, reject) => {
    Users.find(function (err, users) {
      if (err) reject(err);
      else {
        resolve(
          users.map(user => {
            const { name, email, role, _id } = user;
            return ({ name, email, role, _id })
          }));
      }
    });
  })
};

export const getById = function(id: string) {
  return new Promise((resolve, reject) => {
    Users.findOne({ _id: id }, function (err, user) {
      if (err) reject(err);
      else {
        const { name, _id, email, role } = user;
        resolve({ name, _id, email, role });
      }
    });
  })
};

export const getByEmail = function(email: string) {
  return new Promise((resolve, reject) => {
    Users.findOne({ email: email }, function (err, user) {
      if (err) {
        reject(err);
      } else if (user !== null) {
        const { name, _id, email, role, password } = user;
        resolve({ name, _id, email, role, password });
      } else {
        resolve({})
      }
    });
  })
};

export const getByUserName = function(username: string) {
  return new Promise((resolve, reject) => {
    Users.findOne({ name: username }, function (err, user) {
      if (err) {
        reject(err);
      } else if (user !== null) {
        const { name, _id, email, role, password } = user;
        resolve({ name, _id, email, role, password });
      } else {
        resolve({})
      }
    });
  })
};

export const remove = function(id: string) {
  return new Promise((resolve, reject) => {
    Users.deleteOne({ _id: id }, function (err, user) {
      if (err) reject(err);
      else {
        const { name, _id, email, role } = user;
        resolve({ name, _id, email, role });
      }
    });
  })
};

export const create = function(user) {
  const { name, email, password } = user;
  return new Promise((resolve, reject) => {
    Users.create({ name, email, password }, function (err, user) {
      if (err) {
        const { name, keyPattern } = err;
        const errorMsg = (name === 'MongoError' && keyPattern.email === 1) ?
          { message: "Email already registered" } : { message: "Invalid entries. Try again" }
        reject(errorMsg); 
      } else {
        const { name, _id, email, role } = user;
        resolve({ name, email, role, _id });
      }
    });
  })
};

export const update = function(user) {
  const { id, name, email, password } = user;
  return new Promise((resolve, reject) => {
    Users.findOneAndUpdate({ _id: id },{ name, email, password }, function (err, user) {
      if (err) reject(err);
      else {
        const { name, _id, email, role } = user;
        resolve({ name, _id, email, role });
      }
    });
  })
};

export default Users