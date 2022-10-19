const express = require('express');
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose');

const router = require('./routes/users.js');
const routerCard = require('./routes/cards.js')
const ErrorNotFound = require('./error.js')

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

mongoose.connect('mongodb://0.0.0.0:27017/mestodb')
.then(res=>console.log('conneted db'))
.catch(err=>console.log(err))

app.use('/users', router);
app.use('/users/:userId ', router);
app.use((req, res, next) => {
  req.user = {
    _id: '634d93600bf5a50268b62de3'
  };

  next();
}); 
app.use('/cards', routerCard);
app.use('/cards/:cardId', routerCard);
app.use('/cards/:cardId/likes', routerCard);
app.use('/cards/:cardId/likes', routerCard); 
app.use('/users/me', router);
app.use('/users/me/avatar', router);

app.use('*', (req, res, next) => {
  res.send(new ErrorNotFound('Страница не найдена'));
});


app.listen(PORT, () => {
  console.log(`App listening on port 3000`);
}); 