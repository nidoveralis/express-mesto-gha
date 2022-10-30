const { celebrate, Joi } = require('celebrate');
const { linkValid } = require('../constants');

const validationSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2).max(30).pattern(linkValid),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8)})
  });

const validationSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required()})
});

const validationEditUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30)})
});

const validationEditAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().min(2).max(30).pattern(linkValid)})
});

const validationCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().min(2).max(30).pattern(linkValid)})
});

const validationLikeCard = celebrate({
  body: Joi.object().keys({
    _id: Joi.string().required(),///////
    })
});

module.exports = {
  validationSignup,
  validationSignin,
  validationEditUser,
  validationEditAvatar,
  validationCreateCard,
  validationLikeCard
}