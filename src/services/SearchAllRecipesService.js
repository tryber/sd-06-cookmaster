const { searchAllRecipesDb } = require('../models/recipesModel');

const SearchAllRecipesService = async (_res) => {
    const newRecipe = await searchAllRecipesDb();

    return newRecipe;
};

module.exports = SearchAllRecipesService;
