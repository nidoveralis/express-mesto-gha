const { ERROR_CODE_INCORRECT_DATA, ERROR_CODE_DEFAYLT, ERROR_CODE_NOT_FOUND, ERROR_CODE_EMAIL_USED, ERROR_CODE_INCORRECT_MAIL_PASSWORD } = require('./constants');

class ErrorDefault extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_DEFAYLT;
    this.errorMessage = message;
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
    this.errorMessage = message;
  }
};

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_NOT_FOUND;
    this.errorMessage = message;
  }
};

class IncorrectImailOrPassword extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_INCORRECT_MAIL_PASSWORD
    this.errorMessage = message;
  }
};

module.exports = {
  ErrorDefault,
  IncorrectData,
  UsedEmail,
  NotFound,
  IncorrectImailOrPassword
}