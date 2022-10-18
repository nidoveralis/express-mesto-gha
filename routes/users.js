const router = require('express').Router();
const {getUser, createUser, getUserById, editUser, editAvatar} = require('../controllers/users.js')

router.get('/', getUser);
router.post('/',createUser);
router.get('/:userId',getUserById);
router.use((req, res, next) => {
  req.user = {
    _id: '634d93600bf5a50268b62de3'
  };
  next();
})
router.patch('/me', editUser);
router.patch('/me/avatar', editAvatar);
///634d93600bf5a50268b62de3

module.exports = router;