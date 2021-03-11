const { createRecipeDb, SearchRecipeByNameDb } = require('../models/RecipesModel');
const { searchUserByTokenDb } = require('../models/UserModel');

const UNAUTHORIZED = 401;

const CreateRecipeService = async ({ name, ingredients, preparation }, { authorization }, res) => {
    const currentToken = await searchUserByTokenDb(authorization);

    if (!authorization) {
        return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
    }

    if (currentToken === null || authorization !== currentToken.token) {
        return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
    }

    await createRecipeDb(name, ingredients, preparation);

    const newRecipe = await SearchRecipeByNameDb(name);

    return newRecipe;
};

module.exports = CreateRecipeService;
