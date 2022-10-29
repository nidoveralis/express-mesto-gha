const ERROR_CODE_INCORRECT_DATA = 400;
const ERROR_CODE_INCORRECT_MAIL_PASSWORD = 401;
const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_EMAIL_USED = 409;
const ERROR_CODE_DEFAYLT = 500;

const linkValid = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,}\.[a-zA-Z0-9()]{1,}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/;

module.exports = {
  ERROR_CODE_INCORRECT_DATA,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_DEFAYLT,
  ERROR_CODE_EMAIL_USED,
  ERROR_CODE_INCORRECT_MAIL_PASSWORD,
  linkValid
};
