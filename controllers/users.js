const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ERROR_CODE_INCORRECT_DATA, ERROR_CODE_DEFAYLT, ERROR_CODE_NOT_FOUND } = require('../constants');

module.exports.getUser = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(ERROR_CODE_DEFAYLT).send({ message: 'Произошла ошибка' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then(hash=> User.create({ name, about, avatar, email , password: hash})
    .then((user) => res.send({ name: user.name, about: user.about, avatar: user.avatar, email: user.email }))
    .catch((err) => {
      console.log('err.statusCode')
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_INCORRECT_DATA).send({ message: 'Переданы некорректные данные.' });
      } else {
        res.status(ERROR_CODE_DEFAYLT).send({ message: 'Произошла ошибка.' });
      }
    }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user === null) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Пользователь не найден.' });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_INCORRECT_DATA).send({ message: 'Некорректный id' });
      } else {
        res.status(ERROR_CODE_DEFAYLT).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.editUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true, new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_INCORRECT_DATA).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      } else {
        res.status(ERROR_CODE_DEFAYLT).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.editAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_INCORRECT_DATA).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
      } else {
        res.status(ERROR_CODE_DEFAYLT).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.login = (req, res) => {
  const { email } = req.body;
  User.findUserByCredentials( {email} ).select('+password')
    .then((user)=>{
      const token = jwt.sign({_id: user._id}, 'some-secret-key', {expiresIn: '7d'});
      res.cookie('jwt', token, {httpOnly: true}).end()
    })
};