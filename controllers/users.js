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
  .catch(err => res.send({message: err}))
};

module.exports.getUserById = (req, res) => {
  User.findById(req.body._id)
  .then(user => res.send({ data: user }))
  .catch(err => res.send({message: err}))
};

module.exports.editUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, {name: req.body.name, about: req.body.about}, { new: true })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: err }));
};

module.exports.editAvatar = (req,res) =>{
  User.findByIdAndUpdate(req.user._id, {avatar: req.body.avatar}, { new: true })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: err }));
}