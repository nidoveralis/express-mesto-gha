const User = require('../models/user.js');

module.exports.getUser = (req, res) => {
  User.find({})
  .then(user => res.send({ data: user }))
  .catch(err => res.send({message: err}))
};

module.exports.createUser = (req, res) => {
    const {name, about, avatar} = req.body
     User.create({name, about, avatar})
    .then(user => res.send({ data: user }))
    .catch((err)=>{
      if(err.name==="ValidationError"){
        res.status(400).send({message: "Переданы некорректные данные при создании пользователя."})
      }
})};

module.exports.getUserById = (req, res) => {
   User.findById(req.params.userId)
    .then(user => 
      {
        if(user===null) {
          res.status(404).send({message: `Пользователь по указанному _id ${req.params.userId} не найден.`})
        }else {
          res.send({ data: user })
        }
      })
   .catch((err)=>{
    res.status(400).send({message: `Пользователь по указанному _id ${req.params.userId} не найден.`})
  })
};

module.exports.editUser = (req, res) => {
  const {name, about} = req.body
   User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
   .then(user => res.send({ data: user }))
    .catch((err)=>{
      if(err.name === "ValidationError"){
        res.status(400).send({message: "Переданы некорректные данные при обновлении профиля."})
      }}
)}; 

module.exports.editAvatar = (req,res) =>{
  const {avatar} = req.body
  User.findByIdAndUpdate(req.user._id, {avatar}, { new: true, runValidators: true })  
    .then(user => res.send( user)
    .catch((err)=>{
      if(err.name==="ValidationError"){
        res.status(400).send({message: "Переданы некорректные данные при обновлении аватара."})
      }
})};