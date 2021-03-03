const returnedStatusAndMessage = (callback, status, message) => callback
  .status(status).json({ message });

module.exports = returnedStatusAndMessage;
