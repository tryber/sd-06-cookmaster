const throwThisError = (code, msg) => {
  const err = new Error(msg);
  err.codeStatus = code;
  throw err;
};

module.exports = { throwThisError };