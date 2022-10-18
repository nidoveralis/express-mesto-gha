const router = require('express').Router();
const {getUser, createUser, getUserById, editUser} = require('../controllers/users.js')

router.get('/', getUser);
router.post('/',createUser);
router.get('/:userId',getUserById);
router.patch('/me', editUser);
///634d93600bf5a50268b62de3

module.exports = router;