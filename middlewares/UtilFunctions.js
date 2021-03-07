//  FUNCTIONS UTILS

// VALID EMAIL
function validateEmail(email) {
  const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
  if (!regexEmail.test(email)) return false;
  return true;
}

// VALID EMAIL EXIST
function validateEmailExist(email) {
  if (!email || email === '') return false;
  return true;
}

// VALID USERNAME
function validUsername(name) {
  if (!name || name === '') return false;
  return true;
}

// VALID PASSWORD
function validPassword(password) {
  if (!password || password === '') return false;
  return true;
}

// VALID INGREDIENTS
function validIngredients(ingredients) {
  if (!ingredients || ingredients === '') return false;
  return true;
}

// VALID PREPARATION
function validPreparation(preparation) {
  if (!preparation || preparation === '') return false;
  return true;
}

module.exports = {
  validateEmail,
  validUsername,
  validPassword,
  validateEmailExist,
  validIngredients,
  validPreparation,
};