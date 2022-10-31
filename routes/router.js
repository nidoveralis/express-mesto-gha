const router = require('express').Router();
const cookieParser = require('cookie-parser');

const auth = require('../middlewares/auth');
const users = require('./users');
const cards = require('./cards');
const { validationSignup, validationSignin } = require('../validation/validation');
const { createUser, login } = require('../controllers/users');

router.post('/signin', validationSignin, login);
router.post('/signup', validationSignup, createUser);

router.use(cookieParser());
router.use('/users', auth, users);
router.use('/cards', auth, cards);

module.exports = router;
