const router = require('express').Router();
const {
  getUser, getUserById, editUser, editAvatar, createUser
} = require('../controllers/users');

router.post('/', createUser);
router.get('/', getUser);
router.get('/me', getUser);
router.get('/:userId', getUserById);
router.patch('/me', editUser);
router.patch('/me/avatar', editAvatar);

module.exports = router;
