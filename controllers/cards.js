const Card = require('../models/card');
const { IncorrectData, NotFound, ForbiddenError } = require('../errors');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const owner = req.user._id; 
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectData('Переданы некорректные данные при создании карточки.'))
      } else {
        next();
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card === null) {
        next(new NotFound('Карточка не найдена'))
      }if (JSON.stringify(req.user._id) !== JSON.stringify(card.owner)) {
        next(new ForbiddenError('Это не ваша карточка'))
      }else {
       res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectData('Некорректный id'))
      } else {
        next();
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  console.log(req.params.cardId, req.user._id )
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        next(new NotFound('Переданы некорректные данные для постановки лайка.'))
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectData('Некорректный id'))
      } else {
        next();
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        next(new NotFound('Переданы некорректные данные для снятия лайка.'))
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectData('Некорректный id'))
      } else {
        next();
      }
    });
};
