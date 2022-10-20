const router = require('express').Router();
const {getUser, createUser, getUserById, editUser, editAvatar} = require('../controllers/users.js')

router.get('/', getUser);
router.post('/',createUser);
router.get('/:userId',getUserById); 
router.patch('/me', editUser); 
router.patch('/me/avatar', editAvatar);

module.exports = router;