module.exports = class Err {
  constructor({ message }, status = 400) {
    this.message = message;
    this.status = status;
  }
};
