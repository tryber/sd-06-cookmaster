const jwt = require('jsonwebtoken');
const { findEmail } = require('../users/userModel');
const { getRecipeById } = require('../recipes/recipeModel');

const secret = 'twocankeepasecretifoneofthemisdead';
const BAD_REQUEST = 400;
const CONFLICT = 409;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const FORBIDDEN = 403;

const validateUserInfo = async (name, email, password) => {
  if (!name || !email || !password) return false;
  if (name.length === 0 || email.length === 0 || password.length === 0) return false;
  return true;
};

const regexValidation = async (email) => {
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
  if (!regexEmail.test(email)) return false;
  return true;
};

const validateUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const isValid = await validateUserInfo(name, email, password);
  const validRegex = await regexValidation(email);
  
  if (!isValid || !validRegex) {
    return res.status(BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  }
  const emailExist = await findEmail(email);
  if (emailExist) {
    return res.status(CONFLICT).json({ message: 'Email already registered' });
  }
  next();
};

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;
    if (!email || !password) {
      return res.status(UNAUTHORIZED)
      .json({ message: 'All fields must be filled' });
    }
    const user = await findEmail(email);
    if (!user || user.password !== password) {
      return res.status(UNAUTHORIZED)
      .json({ message: 'Incorrect username or password' });
    }
    const { password: userPassword, ...infoUser } = user;
    req.info = infoUser;
    next();
};

const validateRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  const validName = !name || name.length === 0;
  const validIngredients = !ingredients || ingredients.length === 0;
  const validPreparation = !preparation || preparation.length === 0;

  if (validName || validIngredients || validPreparation) {
    return res.status(BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

// NÃO APAGAR
// const { id } = req.params;
// const getRecipe = await getRecipeById(id);
// if (payload.role === 'admin') {
//   return null;
// } else if (payload._id !== getRecipe.userId){
//   return res.status(UNAUTHORIZED)
//   .json({ message: 'not the author' });
// }
 
const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  const error = 'jwt malformed';
  if (!token) return res.status(UNAUTHORIZED).json({ message: 'missing auth token' });
  try {
    const payload = jwt.verify(token, secret);
    const user = await findEmail(payload.email);
    if (!user) return res.status(UNAUTHORIZED).json({ message: error });
    const { _id } = user;
    req.user = _id;
    next();
  } catch (err) {
    return res.status(UNAUTHORIZED).json({ message: error });
  }
};

const validateExistingRecipe = async (req, res, next) => {
  const { id } = req.params;
  if (!id || id.length < 24) return res.status(NOT_FOUND).json({ message: 'recipe not found' });
  const recipe = await getRecipeById(id);
  if (!recipe) return res.status(NOT_FOUND).json({ message: 'recipe not found' });
  req.recipe = { recipe };
  next();
};

const validateAdmin = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(UNAUTHORIZED).json({ message: 'missing auth token' });
  const payload = jwt.verify(token, secret);
  const user = await findEmail(payload.email);
  console.log(user);
  if (user.role === 'admin') {
    next();
  } else {
    return res.status(FORBIDDEN).json({ message: 'Only admins can register new admins' });
  }
};

module.exports = {
  validateUser,
  validateLogin,
  validateToken,
  validateRecipe,
  validateExistingRecipe,
  validateAdmin,
};
