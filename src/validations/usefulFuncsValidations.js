const objError = (message, status) => ({ message, status });
// const isString = (parameter) => typeof parameter === 'string';
// const isEqual = (parameter1, parameter2) => parameter1 === parameter2;
// const isLessThan = (parameter1, parameter2) => parameter1 < parameter2;
const isBlank = (parameter) => !parameter;
const isValidEmail = (email) => {
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  return !regex.test(email);  
};

module.exports = {
  objError,
  isBlank,
  isValidEmail,
};
