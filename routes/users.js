const router = require('express').Router();
const { getUser, getUserById, editUser, editAvatar } = require('../controllers/users');
const cookieParser = require('cookie-parser');
const {celebrate, Joi, errors} = require('celebrate');
const { linkValid } = require('../constants');
const { validationEditUser, validationEditAvatar } = require('../validation/validation')

//router.use(cookieParser());

router.get('/', getUser);
router.get('/me', getUserById);
router.get('/:userId', getUserById);
router.patch('/me', validationEditUser,editUser);
router.patch('/me/avatar', validationEditAvatar, editAvatar);

module.exports = router;
