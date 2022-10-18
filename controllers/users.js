const User = require('../models/user.js');

module.exports.getUser = (req, res) => {
  User.find({})
  .then(user => res.send({ data: user }))
  .catch(err => res.send(`<p>${err}</p>`))
};

module.exports.createUser = (req, res) => {
  const {name, about, avatar} = req.body
  User.create({name, about, avatar})
  .then(user => res.send({ data: user }))
  .catch(err => res.send(`<p>sds ${err}</p>`))
};

module.exports.getUserById = (req, res) => {
  User.findById(req.body._id)
  .then(user => res.send({ data: user }))
  .catch(err => res.send(`<p>${err}</p>`))
};

module.exports.editUser = (req, res) => {
  console.log(req.params.users)
 // User.findByIdAndUpdate(req.params._id, {name: req.body.name, about: req.body.about})
   // .then(user => res.send({ data: user }))
   // .catch(err => res.status(500).send({ message: err }));
};