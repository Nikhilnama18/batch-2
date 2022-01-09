class BaseError extends Error {
  constructor(message, statusCode, description) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);
    this.message = message;
    this.statusCode = statusCode;
    this.description = description;
    Error.captureStackTrace(this);
  }
}

class UpdateError extends BaseError {
  constructor(message, statusCode = 400, description = "Updation Failed") {
    super(message, statusCode, description);
  }
}

module.exports = { BaseError, UpdateError };
