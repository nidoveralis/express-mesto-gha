const router = require('express').Router();
const { getCards, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');
const { validationEditAvatar, validationIdCard } = require('../validation/validation');
const { celebrate, Joi } = require('celebrate');
const { linkValid } = require('../constants');
router.get('/', getCards);
router.post('/', validationEditAvatar, createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', validationIdCard, dislikeCard);

module.exports = router;
