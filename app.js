const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const router = require('./routes/users');
const routerCard = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

mongoose.connect('mongodb://0.0.0.0:27017/mestodb')
  .then(() => console.log('conneted db'))
  .catch((err) => console.log(err));

app.use((req, res, next) => {
  req.user = {
    _id: '634d93600bf5a50268b62de3',
  };

  next();
});

app.use('/users', router);

app.use('/cards', routerCard);

app.use('*', (req, res, next) => {
  res.status(404).send({ message: 'Страница не найдена.' });
});

app.listen(PORT, () => {
  console.log('App listening on port 3000');
});
