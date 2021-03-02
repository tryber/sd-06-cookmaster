const badRequest = 400;

module.exports = (message, status = badRequest) =>
  (JSON.stringify({ message, status }));
