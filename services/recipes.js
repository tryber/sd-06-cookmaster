const recipes = require('../models/recipes');

// const minNameLength = 5;
// const nullQuantity = 0;
const idMongoLength = 24;
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

const userChecker = async (recipeId, user) => {
  const { userId } = await recipes.findById(recipeId);
  const { _id } = user;
  if (JSON.stringify(userId) === JSON.stringify(_id)) return true;

  return false;
};

// const isUnique = async (name) => {
//   const checkUnique = await products.findByName(name);

//   if (checkUnique) return nameExists;

//   return true;
// };

const getAll = async () => {
  const productsArray = await recipes.getAll();

  return productsArray;
};

const findById = async (id) => {
  if (id.length !== idMongoLength) return errorWriter(404, 'recipe not found');

  const product = await recipes.findById(id);

  if (!product) return errorWriter(404, 'recipe not found');
  
  return product;
};

const create = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) {
    return errorWriter(400, 'Invalid entries. Try again.');
  }
  const { insertedId } = await recipes.create(name, ingredients, preparation, userId);
  return {
    name,
    ingredients,
    preparation,
    userId,
    _id: insertedId,
  };
};

const update = async (id, updateRecipe, loggedUser) => {
  const { name, ingredients, preparation } = updateRecipe;
  const checkUser = await userChecker(id, loggedUser);
  console.log('checking user: ', checkUser);
  console.log('Is admin? ', loggedUser.role);
  if (!checkUser && loggedUser.role !== 'admin') {
    return errorWriter(401, 'User unauthoried to update recipe');
  }

  const updatedRecipe = await recipes.update(id, name, ingredients, preparation);
  if (!updatedRecipe) return errorWriter(404, 'Recipe not found');
  return updatedRecipe;
};

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
  getAll,
  findById,
  create,
  update,
//   deleteProduct,
};