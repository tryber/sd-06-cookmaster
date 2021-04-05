class ThrowError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

const sendError = (err, res) => {
  const { message } = err;

  res.status(404).json({
    err: { message },
  });
};

module.exports = { ThrowError, sendError };
