const { SearchRecipeByIdDb } = require('../models/RecipesModel');

const NOT_FOUND = 404;
const OK = 200;

const SearchRecipeByIdService = async (id, res) => {
    if (id.length !== 24) {
        return res.status(NOT_FOUND).json({ message: 'recipe not found' });
    }

    const recipeById = await SearchRecipeByIdDb(id);

    if (recipeById === null) {
        return res.status(NOT_FOUND).json({ message: 'recipe not found' });
    }

    return res.status(OK).json(recipeById);
};

module.exports = SearchRecipeByIdService;
