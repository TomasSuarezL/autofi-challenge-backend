function AppError(message, status) {
    Error.call(this);
    Error.captureStackTrace(this);
    this.message = message;
    this.status = status;
};

AppError.prototype = Object.create(Error.prototype);
AppError.prototype.constructor = AppError;

module.exports.AppError = AppError;