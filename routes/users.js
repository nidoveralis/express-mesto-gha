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
//router.post('/singup', celebrate({
  //body: Joi.object().keys({
    //name: Joi.string().min(2).max(30),
   // about: Joi.string().min(2).max(30),
   // avatar: Joi.string().min(2).max(30),
   // email: Joi.string().required().email(),
   // password: Joi.string().required().min(8),
 // })
//}//), createUser);//

module.exports = router;
