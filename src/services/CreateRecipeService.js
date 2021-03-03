const { createRecipeDb } = require('../models/recipesModel');
const { searchUserByTokenDb } = require('../models/UserModel');

const UNAUTHORIZED = 401;

const CreateRecipeService = async ({ name, ingredients, preparation }, { authorization }, res) => {
    const currentToken = await searchUserByTokenDb(authorization);

    if (currentToken === null || authorization !== currentToken.token) {
        return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
    }
    
    if (!authorization) {
        return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
    }

    const newRecipe = await createRecipeDb(name, ingredients, preparation);

    return newRecipe;
};

module.exports = CreateRecipeService;
