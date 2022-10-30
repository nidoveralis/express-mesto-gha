const router = require('express').Router();
const { getUser, getUserById, editUser, editAvatar } = require('../controllers/users');
const cookieParser = require('cookie-parser');
const { validationEditUser, validationEditAvatar } = require('../validation/validation')
const { celebrate, Joi } = require('celebrate');
const { linkValid } = require('../constants');

//router.use(cookieParser());

router.get('/', getUser);
router.get('/me', getUserById);
router.get('/:userId', getUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30)})
}),editUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().min(2).max(30).pattern(linkValid)})
}), editAvatar);

module.exports = router;
