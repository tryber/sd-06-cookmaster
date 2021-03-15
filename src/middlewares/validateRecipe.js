const BADREQUEST = 400;

async function validateRecipe(req, res, next) {
  const { name, ingredients, preparation } = req.body;
  
  if (!name || !ingredients || !preparation) {
    return res.status(BADREQUEST).json({ message: 'Invalid entries. Try again.' });
  }
  
  next();
}

module.exports = {
  validateRecipe,
};