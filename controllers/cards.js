const Card = require('../models/card.js');

module.exports.getCards = (req, res) => {
  Card.find({})
  .then(cards => res.send({ data: cards }))
  .catch(err => res.send({message: err}))
};

module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then(card => res.send({ data: card }))
    .catch((err)=> {
    if(err.name==="ValidationError"){
      res.status(400).send({message: "Переданы некорректные данные при создании карточки."})
    }
  })
};

module.exports.deleteCard = (req, res) => {
     Card.findByIdAndRemove(req.params.cardId)
    .then(card => {
      if(card===null) {
        res.status(404).send({message: ` Карточка с указанным _id ${req.params.cardId} не найдена.`})
      }else {
        res.send({ data: card })
      }
    })
    .catch((err)=>{
    res.status(400).send({message: `Карточка с указанным _id ${req.params.cardId} не найдена.`})
  })
};

module.exports.likeCard = (req, res) => {
   Card.findByIdAndUpdate(
      req.params.cardId,
    { $addToSet: { likes: req.user._id } },{ new: true })
    .then(card => 
      {
        if(card===null) {
          res.status(404).send({message: "Переданы некорректные данные для постановки лайка."})
        }else {
          res.send({ data: card })
        }
      })
    .catch((err)=>{
    res.status(400).send({message: `Передан несуществующий _id ${req.params.cardId} карточки.`})
  })
};

module.exports.dislikeCard = (req, res) => {
   Card.findByIdAndUpdate(
      req.params.cardId,
    { $pull: { likes: req.user._id } },{ new: true })
    .then(card => 
      {
        if(card===null) {
          res.status(404).send({message: "Переданы некорректные данные для снятия лайка."})
        }else {
          res.send({ data: card })
        }
      })
   .catch((err)=>{
    res.status(400).send({message: `Передан несуществующий _id ${req.params.cardId} карточки.`})
  })
};