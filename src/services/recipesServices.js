const jwt = require('jsonwebtoken');

const { uploadDB } = require('../models/mongoDbRequests');

const connectionRecipes = 'recipes';

const registerRecipe = async (body, headers) => {
  const { authorization: token } = headers;
  // console.log('token', token);
  try {
    const { _id: userId } = jwt.decode(token);
    const copyBodyAddUserId = { ...body, userId };

    await uploadDB(connectionRecipes, copyBodyAddUserId);
    const recipe = copyBodyAddUserId;
    return { recipe };
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  registerRecipe,
};
