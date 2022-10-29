const { ERROR_CODE_INCORRECT_DATA, ERROR_CODE_DEFAYLT, ERROR_CODE_NOT_FOUND, ERROR_CODE_EMAIL_USED } = require('./constants');

class ErrorDefault extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_DEFAYLT;
    this.message = message;
  }
};

class IncorrectData extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_INCORRECT_DATA;
    this.errorMessage = message;
  }
};

class UsedEmail extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_EMAIL_USED;
    this.message = message;
  }
};

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_NOT_FOUND;
    this.message = message;
  }
};



module.exports = {
  ErrorDefault,
  IncorrectData,
  UsedEmail,
  NotFound
}