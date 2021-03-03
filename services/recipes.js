const recipes = require('../models/recipes');

// const minNameLength = 5;
// const nullQuantity = 0;
// const idMongoLength = 24;
// const nameLengthErrorMessage = '"name" length must be at least 5 characters long';
// const nameExists = 'Product already exists';
// const quantityErrorMessage = '"quantity" must be larger than or equal to 1';
// const quantityTypeErrorMessage = '"quantity" must be a number';

const errorWriter = (code, message) => ({
    err: {
    statusCode: code,
    customMessage: message,
  },
});

// const isValid = (name, quantity) => {
//   if (name.length < minNameLength) return nameLengthErrorMessage;
//   if (!Number.isInteger(quantity)) return quantityTypeErrorMessage;
//   if (quantity <= nullQuantity) return quantityErrorMessage;

//   return true;
// };

// const isUnique = async (name) => {
//   const checkUnique = await products.findByName(name);

//   if (checkUnique) return nameExists;

//   return true;
// };

// const getAll = async () => {
//   const productsArray = await products.getAll();

//   return productsArray;
// };

// const findById = async (id) => {
//   const errorObject = {
//     err: {
//       code: 'invalid_data',
//       message: 'Wrong id format',
//     }
//   };

//   if (id.length !== idMongoLength) return errorObject;

//   const product = await products.findById(id);

//   if (!product) return errorObject;
  
//   return product;
// };

const create = async ({ name, ingredients, preparation, userId }) => {
  if (!name || !ingredients || !preparation) {
    return errorWriter(400, 'Invalid entries. Try again.');
  }
  const { insertedId } = await recipes.create({ name, ingredients, preparation, userId });
  return {
    name,
    ingredients,
    preparation,
    userId,
    _id: insertedId,
  };
};

// const update = async (id, updateProduct) => {
//   const { name, quantity } = updateProduct;
//   const validOrErrorMessage = isValid(name, quantity);
//   const errorObject = {
//     err: {
//       code: 'invalid_data',
//       message: 'Wrong id format',
//     }
//   };

//   if (validOrErrorMessage !== true) return {
//     err: {
//       code: 'invalid_data',
//       message: validOrErrorMessage,
//     }
//   };

//   const updatedProduct = await products.update(id, name, quantity);

//   if (!updatedProduct) return errorObject;

//   return updatedProduct;
// };

// const deleteProduct = async (id) => {
//   const errorObject = {
//     err: {
//       code: 'invalid_data',
//       message: 'Wrong id format',
//     }
//   };

//   if (id.length !== idMongoLength) return errorObject;

//   const deleteProduct = await products.deleteProduct(id);
  
//   if (!deleteProduct) return errorObject;

//   return deleteProduct;
// };

module.exports = {
//   getAll,
//   findById,
  create,
//   update,
//   deleteProduct,
};