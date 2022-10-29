const mongoose = require('mongoose');
const validator = require('validator');
const { ERROR_CODE_INCORRECT_DATA, ERROR_CODE_DEFAYLT, ERROR_CODE_INCORRECT_MAIL_PASSWORD } = require('../constants');
//const linkValid = /[a-zA-Z\d-]+\.[\w\d\]{2,}/;
const { linkValid } = require('../constants'); 

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: "Жак-Ив Кусто",
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: "Исследователь",
    },
    avatar: {
      type: String,
      default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
      validate: {
        validator: (v)=> linkValid.test(v),
        message: 'Некорректная ссылка'
    }
    },
    email: {
      type: String,
      require: true,
      unique: true
    },
    password: {
      type: String,
      require: true,
      select: false
    }
  },
  { versionKey: false },
);
userSchema.static.findUserByCredentials = function (email, password) {
  return this.findOne({email})
    .then((user)=> {
      if(user === null){
        res.status(ERROR_CODE_INCORRECT_MAIL_PASSWORD).send({ message: 'Неправильные почта или пароль.' });
      };
        return bcrypt.compare(password,user.password)
        .then((matched)=>{
          if(!matched) {
            res.status(ERROR_CODE_INCORRECT_MAIL_PASSWORD).send({ message: 'Неправильные пароль.' });
          }
          return user;
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_INCORRECT_DATA).send({ message: 'Переданы некорректные данные.' });
      } else {
        res.status(ERROR_CODE_DEFAYLT).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports = mongoose.model('user', userSchema);
