const { ERROR_CODE_INCORRECT_DATA, ERROR_CODE_DEFAYLT, ERROR_CODE_NOT_FOUND, ERROR_CODE_EMAIL_USED } = require('./constants');

class errorDefault extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_DEFAYLT;
    //this.message = message;
  }
};

class incorrectData extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_INCORRECT_DATA;
    //this.message = message;
  }
};

module.exports = {
  errorDefault,
  incorrectData
}