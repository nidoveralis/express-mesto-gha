const Card = require('../models/card');
const { ERROR_CODE_INCORRECT_DATA, ERROR_CODE_DEFAYLT, ERROR_CODE_NOT_FOUND } = require('../constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(ERROR_CODE_DEFAYLT).send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const owner = req.user._id; 
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_INCORRECT_DATA).send({ message: 'Переданы некорректные данные при создании карточки.' });
      } else {
        res.status(ERROR_CODE_DEFAYLT).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card === null) {
        res.status(404).send({ message: 'Нет карты' });
      }if (JSON.stringify(req.user._id) !== JSON.stringify(card.owner)) {
        res.status(403).send({ message: 'НЕ твоя карта' });
      }else {
       res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_INCORRECT_DATA).send({ message: 'Некорректный id' });
      } else {
        res.status(ERROR_CODE_DEFAYLT).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  console.log(req.params.cardId, req.user._id )
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Переданы некорректные данные для постановки лайка.' });
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_INCORRECT_DATA).send({ message: 'Некорректный id' });
      } else {
        res.status(ERROR_CODE_DEFAYLT).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Переданы некорректные данные для снятия лайка.' });
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_INCORRECT_DATA).send({ message: 'Некорректный id' });
      } else {
        res.status(ERROR_CODE_DEFAYLT).send({ message: 'Произошла ошибка' });
      }
    });
};
