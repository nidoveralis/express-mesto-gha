const jwt = require('jsonwebtoken');
const { ERROR_CODE_INCORRECT_MAIL_PASSWORD } = require('../constants');

module.exports = (req,res, next) => {
  const authorization = req.cookies.jwt;

  if(!authorization) {
    res.status(ERROR_CODE_INCORRECT_MAIL_PASSWORD).send({ message: 'Необходима авторизация.' });
  }
  const token = authorization;
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  }catch(err) {
    res.status(ERROR_CODE_INCORRECT_MAIL_PASSWORD).send({ message: 'Необходима авторизация.' });
  }
    req.user = payload;
    next(); 
};