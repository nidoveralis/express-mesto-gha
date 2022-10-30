const router = require('express').Router();
const { getCards, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');
const { validationCreateCard, validationId } = require('../validation/validation');

router.get('/', getCards);
router.post('/', validationCreateCard, createCard);
router.delete('/:cardId', validationId, deleteCard);
router.put('/:cardId/likes', //validationId, 
likeCard);
router.delete('/:cardId/likes', validationId, dislikeCard);

module.exports = router;
