// const recipesServices = require('../services/recipesService');
const code = 400;
const msg = 'Invalid entries. Try again.';

function verifyItensRecipes(request, response, next) {
 const { name, ingredients, preparation } = request.body;
 if (!name) return response.status(code).json({ message: msg });
 if (!ingredients) return response.status(code).json({ message: msg });
 if (!preparation) return response.status(code).json({ message: msg });
 next();
}

module.exports = {
  verifyItensRecipes,
};