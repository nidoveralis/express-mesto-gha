const router = require('express').Router();
const { getUser, getUserMe, getUserById, editUser, editAvatar } = require('../controllers/users');
const { validationEditUser, validationEditAvatar } = require('../validation/validation')
const { celebrate, Joi } = require('celebrate');
const { linkValid } = require('../constants');

router.get('/', getUser);
router.get('/me', getUserMe);
router.get('/:userId', getUserById);
router.patch('/me', validationEditUser, editUser);
router.patch('/me/avatar', validationEditAvatar, editAvatar);

module.exports = router;
