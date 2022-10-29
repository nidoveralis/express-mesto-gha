const ERROR_CODE_INCORRECT_DATA = 400;
const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_INCORRECT_MAIL_PASSWORD = 401;
const ERROR_CODE_DEFAYLT = 500;

const linkValid = /^https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}/;

module.exports = {
  ERROR_CODE_INCORRECT_DATA,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_DEFAYLT,
  ERROR_CODE_INCORRECT_MAIL_PASSWORD,
  linkValid
};
