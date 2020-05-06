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
  },
  deleteUser: (req, res, next) => {
    User.findByIdAndRemove(req.params.userId)
      .then(user => {
        if (!user) {
          next();
        } else
          res.json({
            message: `Пользователь с ID: ${user._id} успешно удален`
          });
      })
      .catch(err => res.send(err));
  },
  updateUser: (req, res, next) => {
    User.findByIdAndUpdate(
      req.params.userId,
      {
        name: req.body.name,
        about: req.body.about
      },
      { runValidators: true, new: true }
    )

      .then(user => {
        if (!user) {
          next();
        } else res.send({ message: 'Пользователь обновлен', data: user });
      })
      .catch(err => res.send(err));
  },
  updateAvatar: (req, res, next) => {
    User.findByIdAndUpdate(
      req.params.userId,
      { avatar: req.body.avatar },
      { runValidators: true, new: true }
    )
      .then(user => {
        if (!user) {
          next();
        } else res.send({ message: 'Аватар обновлен', data: user });
      })
      .catch(err => res.send(err));
  }
};
