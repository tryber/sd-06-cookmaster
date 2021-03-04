const OK = 200;
const created = 201;
const badRequest = 400;
const unauthorized = 401;
const notFound = 404;
const conflict = 409;
const invalidParams = 422;
const zero = 0;
const cinco = 5;
const vinteQuatro = 24;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RecipeNotFound = ({ message: 'recipe not found' });

module.exports = {
  OK,
  created,
  badRequest,
  unauthorized,
  notFound,
  conflict,
  invalidParams,
  zero,
  cinco,
  vinteQuatro,
  regexEmail,
  RecipeNotFound,
};