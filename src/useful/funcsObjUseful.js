const objMessageError = (message) => ({ message });
const objError = (message, status) => ({ message, status });

module.exports = {
  objMessageError,
  objError,
};