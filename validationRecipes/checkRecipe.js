// const model = require('../../models/modelRecipes');

const errorMsg = (status, mess) => ({ status, message: { message: mess } });
const checkRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const BAD_REQUEST = 400;
  // const SUCCESS = 200;
  
  if (!name || !ingredients || !preparation) {
 return next(errorMsg(
    BAD_REQUEST, 'Invalid entries. Try again.',
));
}
  next();
};

module.exports = checkRecipe;
