const Card = require('../models/card.js');

module.exports.getCards = (req, res) => {
  Card.find({})
  .then(cards => res.send({ data: cards }))
  .catch(err => res.send({message: err}))
};

module.exports.createCard = async (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  try {
    await Card.create({ name, link, owner })
    .then(card => res.send({ data: card }))
  } catch(err) {
    if(err.name==="ValidationError"){
      res.status(400).send({message: "Переданы некорректные данные при создании карточки."})
    }
  }
};

module.exports.deleteCard = async (req, res) => {
  try {
    await Card.findByIdAndRemove(req.params.cardId)
    .then(card => res.send({ data: card }))
  } catch(err){
    res.status(400).send({message: `Пользователь по указанному _id ${req.params.userId} не найден.`})
  }
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
  { $addToSet: { likes: req.user._id } },{ new: true })
    .then(card => res.send({ data: card }))
    .catch(err => res.send({message: err}))
};

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true })
.then(card => res.send({ data: card }))
.catch(err => res.send({message: err}));