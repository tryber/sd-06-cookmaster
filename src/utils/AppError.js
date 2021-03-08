const BAD_REQUEST = 400;

class AppError {
  constructor(message, statusCode = BAD_REQUEST) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
