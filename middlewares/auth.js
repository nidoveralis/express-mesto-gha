const jwt = require('jsonwebtoken');
const { ERROR_CODE_INCORRECT_MAIL_PASSWORD } = require('../constants');
app.use(cookieParser());

app.use(cookieParser());
//app.get('/posts', (req, res) => {
  //console.log(req.cookies.jwt); // достаём токен
//}); 

module.exports = (req,res, next) => {
  console.log(req.header)
  //const {authorization} = req.header;
  const {authorization} = req.cookies.jwt;
  if(!authorization || !authorization.startWith('Bearer')) {
    res.status(ERROR_CODE_INCORRECT_MAIL_PASSWORD).send({ message: 'Необходима авторизация.' });
  }
  const token = authorization.replace('Bearer', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  }catch(err) {
    res.status(ERROR_CODE_INCORRECT_MAIL_PASSWORD).send({ message: 'Необходима авторизация.' });
  }
    req.user = payload;
    next(); 
};