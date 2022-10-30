const express = require('express');
const bodyParser = require('body-parser');
const { errors} = require('celebrate');
const mongoose = require('mongoose');
const { validationSignup, validationSignin } = require('./validation/validation');
const cookieParser = require('cookie-parser');

const router = require('./routes/users');
const routerCard = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

mongoose.connect('mongodb://0.0.0.0:27017/mestodb');

app.post('/signin', validationSignin, login);

app.post('/signup', validationSignup, createUser);

app.use(cookieParser());
app.use('/users', auth, router);
app.use('/cards', auth, routerCard);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена.' });
});

app.use(errors());
app.use((err,req,res,next)=>{
  const status = err.statusCode || 500;

  res.status(status).send({ message: err.message });
  next();
  //const { statusCode = ERROR_CODE_INTERNAL_SERVER_ERROR, message } = err;

})

app.listen(PORT);