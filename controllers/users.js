const User = require('../models/user');

module.exports = {
  createUser: (req, res, next) => {
    User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar
    })
      .then(user => res.status(201).send({ data: user }))
      .catch(err => res.send(err));
  },
  getUsers: (req, res, next) => {
    User.find({})
      .then(users =>
        res.send({ 'количество пользователей': users.length, data: users })
      )
      .catch(err => res.send(err));
  },
  getUserById: (req, res, next) => {
    User.findById(req.params.userId)
      .then(user => {
        if (!user) {
          next();
        } else res.json({ data: user });
      })
      .catch(err => res.send(err));
  }
};
