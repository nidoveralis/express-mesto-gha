const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {celebrate, Joi, errors} = require('celebrate');

const router = require('./routes/users');
const routerCard = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth')

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

mongoose.connect('mongodb://0.0.0.0:27017/mestodb');

app.use('/signin', login);
app.post('/signup', 
  celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2).max(30).pattern(/^https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  })
  }), createUser);

app.use('/users', auth, router);

app.use('/cards', auth, routerCard);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена.' });
});

app.use(errors());
app.use((err,req,res,next)=>{
  //const { statusCode = ERROR_CODE_INTERNAL_SERVER_ERROR, message } = err;
  console.log('llkk')
  //res.status(statusCode).send({message:'kkjj'})
  //next()
})

app.listen(PORT);
