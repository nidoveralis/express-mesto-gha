const mongoose = require('mongoose');
const validator = require('validator');
const { ERROR_CODE_INCORRECT_DATA, ERROR_CODE_DEFAYLT, ERROR_CODE_INCORRECT_MAIL_PASSWORD } = require('../constants');
const linkValid = require('../constants')
const { isEmail, isURL } = require('validator');
const bcrypt = require('bcryptjs');
const { IncorrectData } = require('../errors');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: false,
      default: "Жак-Ив Кусто",
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: false,
      default: "Исследователь",
    },
    avatar: {
      type: String,
      required: false,
      default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
      validate: {
        validator: (v)=> isURL(v, { required_protocol: true }),
        message: 'Некорректная ссылка' 
    }
    },
    email: {
      type: String,
      require: true,
      unique: true,
      validate:{ 
        validator: (v)=> isEmail(v),
        message: 'Некорректный email'      
      }
    },
    password: {
      type: String,
      require: true,
      select: false
    }
  },
  { versionKey: false },
);
userSchema.statics.findUserByCredentials = function ({email, password}) {

  return this.findOne({email}).select('+password')
    .then((user)=> {
      if(user === null){
        throw new IncorrectData('Неправильные почта или пароль.')
        
        //res.status(ERROR_CODE_INCORRECT_MAIL_PASSWORD).send({ message: 'Неправильные почта или пароль.' });
      };
      return bcrypt.compare(password, user.password)
          .then((matched)=>{
            if(!matched) {
              //res.status(ERROR_CODE_INCORRECT_MAIL_PASSWORD).send({ message: 'Неправильные пароль.' });
            }
            return user;
          });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        //res.status(ERROR_CODE_INCORRECT_DATA).send({ message: 'Переданы некорректные данные.' });
      } else {
        //res.status(ERROR_CODE_DEFAYLT).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports = mongoose.model('user', userSchema);