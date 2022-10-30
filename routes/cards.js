const router = require('express').Router();
const { getCards, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');
const { validationCreateCard, validationLikeCard } = require('../validation/validation');
const { celebrate, Joi } = require('celebrate');
const { linkValid } = require('../constants');
router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', //celebrate({
  //headers: Joi.object().keys({
    //cardId: Joi.string().required().hex(),
  //  })
//}), 
dislikeCard);

module.exports = router;
