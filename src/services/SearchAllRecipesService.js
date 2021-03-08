const { searchAllRecipesDb } = require('../models/RecipesModel');

const SearchAllRecipesService = async (_res) => {
    const newRecipe = await searchAllRecipesDb();

    return newRecipe;
};

module.exports = SearchAllRecipesService;
