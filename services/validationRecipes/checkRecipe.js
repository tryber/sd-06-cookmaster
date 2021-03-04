// [Será validado que não é possível cadastrar receita sem o campo "name"]
const checkRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const BAD_REQUEST = 400;
  // const SUCCESS = 200;
  
  if (!name || !ingredients || !preparation) {
   return res.status(BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  }

  // const UNAUTHORIZED = 401;
  // const token = req.headers.authorization;
  // if (!token) return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
  // if (token.length !== 201) return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
  next();
};

module.exports = checkRecipe;
