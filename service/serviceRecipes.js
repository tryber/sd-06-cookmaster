const { status } = require('../util/dataStatus');
const { createRecipes } = require('../models/modelsRecipes');
const validateToken = require('../util/validTokenJWT');

const { created } = status;

const registerRecipe = async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { authorization } = req.headers;
    
    const user = validateToken(authorization);

    const resultRegisterRecipeinServer = await createRecipes(
      name,
      ingredients,
      preparation,
      user.id,
);
    
    return res.status(created).json(resultRegisterRecipeinServer);
  };

  module.exports = {
    registerRecipe,
  };