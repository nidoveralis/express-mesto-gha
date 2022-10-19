const User = require('../models/user.js');

module.exports.getUser = (req, res) => {
  User.find({})
  .then(user => res.send({ data: user }))
  .catch(err => res.send({message: err}))
};

module.exports.createUser = async (req, res) => {
  try {
    const {name, about, avatar} = req.body
    await User.create({name, about, avatar})
    .then(user => res.send({ data: user }))
  } catch(err){
      if(err.name==="ValidationError"){
        res.status(400).send({message: "Переданы некорректные данные при создании пользователя."})
      }
}};

module.exports.getUserById = async (req, res) => {
  try {
    await User.findById(req.params.userId)
    
    .then(user => 
      {
        if(user===null) {
          res.status(404).send({message: `Пользователь по указанному _id ${req.params.userId} не найден.`})
        }else {
          res.send({ data: user })
        }
      })
  } catch(err){
    res.status(400).send({message: `Пользователь по указанному _id ${req.params.userId} не найден.`})
  }
};

module.exports.editUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, {name: req.body.name, about: req.body.about}, { new: true })
    .then(user => res.send({ data: user }))
    .catch(err => res.send({ message: err }));
};

module.exports.editAvatar = (req,res) =>{
  User.findByIdAndUpdate(req.user._id, {avatar: req.body.avatar}, { new: true })
    .then(user => res.send({ data: user }))
    .catch(err => res.send({ message: err }));
}