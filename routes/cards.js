const router = require('express').Router();
const { getCards, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');
const { validationCreateCard, validationLikeCard } = require('../validation/validation');
const { celebrate, Joi } = require('celebrate');
const { linkValid } = require('../constants');
router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().min(2).max(30).pattern(linkValid)})
}), createCard);
router.delete('/:cardId', celebrate({
  headers: Joi.object().keys({
    cardId: Joi.string().required().hex(),
    })
}), deleteCard);
router.put('/:cardId/likes', celebrate({
  headers: Joi.object().keys({
    cardId: Joi.string().required().hex(),
    })
}), likeCard);
router.delete('/:cardId/likes', celebrate({
  headers: Joi.object().keys({
    cardId: Joi.string().required().hex(),
    })
}), dislikeCard);

module.exports = router;
