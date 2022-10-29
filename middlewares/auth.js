const jwt = require('jsonwebtoken');
const { ERROR_CODE_INCORRECT_MAIL_PASSWORD } = require('../constants');

module.exports = (req,res, next) => {
  const authorization = req.cookies.jwt;
  console.log(authorization)
  //if(!authorization.cookies.jwt || !authorization.cookies.jwt.startsWith('Bearer')) {
    if(!authorization) {
    console.log('jjjj')
    res.status(ERROR_CODE_INCORRECT_MAIL_PASSWORD).send({ message: 'Необходима авторизация.' });
  }else{
    console.log('iiiii')
  }
  const token = authorization//.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  }catch(err) {
    res.status(ERROR_CODE_INCORRECT_MAIL_PASSWORD).send({ message: 'Необходима авторизация.' });
  }
    //req.user = payload;
    //next(); 
};