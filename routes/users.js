const router = require('express').Router();
const { getUser, getUserById, editUser, editAvatar } = require('../controllers/users');
const cookieParser = require('cookie-parser');
const {celebrate, Joi, errors} = require('celebrate');
const { linkValid } = require('./constants');

//router.use(cookieParser());

router.get('/', getUser);
router.get('/me', getUser);
router.get('/:userId', getUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2).max(30).pattern(linkValid),
  })
}) ,editUser);
router.patch('/me/avatar', editAvatar);

module.exports = router;
