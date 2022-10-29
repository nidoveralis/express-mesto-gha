const router = require('express').Router();
const { getUser, getUserById, editUser, editAvatar } = require('../controllers/users');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.get('/posts', (req, res) => {
  console.log(req.cookies.jwt); // достаём токен
}); 

router.get('/', getUser);
router.get('/me', getUser);
router.get('/:userId', getUserById);
router.patch('/me', editUser);
router.patch('/me/avatar', editAvatar);

module.exports = router;
