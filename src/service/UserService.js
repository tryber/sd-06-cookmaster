// const { ObjectId } = require('mongodb');
const userModel = require('../model/Users');

// Return all Users
const getAll = async () => {
  const users = await userModel.getAll();
  return users;
};

// Add new Users
const create = async (name, email, password) => {
  const user = await userModel.create(name, email, password);
  return user;
};

// Return Users by Email
const findByEmail = async (email) => {
  const user = await userModel.findByEmail(email);
  return user;
};

// Return Users by ID
// const findById = async (id) => {
//   console.log('id', id);
//   console.log(validateId(id));
//   if (validateId(id)) {
//     const result = await userModel.findById(id);
//     if (result) return { status: 'OK', result};
//   }
//   return { status: 'NOK', result: 'Wrong id format' };
// };

// // Update Users
// const update = async (id, name, quantity) => {
//   const validationMessage = await validateuserModel('update', name, quantity);
//   if (validationMessage === 'OK' && validateId(id)) {
//     const result = await userModel.update(id, name, quantity);
//     return { status: 'OK', result };
//   }
//   return { status: 'NOK', result: validationMessage };
// };

// // Remove User
// const remove = async (id) => {
//   const userModel = await userModel.findById(id);
//   if (userModel) {
//     userModel.remove(id);
//     return { status: 'OK', userModel};
//   }
//   return { status: 'NOK', result: 'Wrong id format' };
// };

// // Get User By Name
// const getByname = async (name) => {
//   return await userModel.findByName(name);
// };

// // Check Exist Users, search by name
// const existuserModel = async (name) => {
//   const userModel = await getByname(name);
//   return userModel;
// };

// // Validation Id
// const validateId = (id) => {
//   const lengthId = 24;
//   return (id.length === lengthId && id !== undefined);
// };

// // Validation userModel fields
// const validateuserModel = async (typeOperation, name, quantity) => {
//   const nameMaxLength = 5;
//   const zero = 0;

//   if (!name || name.length < nameMaxLength) {
//     return '"name" length must be at least 5 characters long';
//   };
//   if (typeOperation === 'create' && await existuserModel(name)) {
//     return 'userModel already exists';
//   };
//   if ((!quantity && quantity !== zero) || typeof(quantity) !== 'number') {
//     return '"quantity" must be a number';
//   };
//   if (!quantity || quantity <= zero || !Number.isInteger(quantity)) {
//     return '"quantity" must be larger than or equal to 1';
//   };
//   return 'OK';
// };

module.exports = {
  getAll,
  create,
  findByEmail,
  // findById,
  // update,
  // remove,
};
