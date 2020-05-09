const User = require('../models/user');
const { messages } = require('../libs/messages');

module.exports = {
  createUser: (req, res, next) => {
    User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: req.body.password
    })
      .then(user => res.status(201).send({ data: user }))
      .catch(next);
  },
  getUsers: (req, res, next) => {
    User.find({})
      .then(users => {
        if (users.length === 0) {
          res.send({ message: messages.users.emptyDb });
        } else res.send({ data: users });
      })

      .catch(next);
  },
  getUserById: (req, res, next) => {
    User.findById(req.params.userId)
      .orFail()
      .catch(next);
  },
  deleteUser: (req, res, next) => {
    User.findByIdAndRemove(req.params.userId)
      .then(user => {
        if (!user) {
          next();
        } else
          res.json({
            message: messages.users.userDeleted
          });
      })
      .catch(err => res.send(err));
  },
  updateUser: (req, res, next) => {
    User.findByIdAndUpdate(
      req.user._id,
      {
        name: req.body.name,
        about: req.body.about
      },
      { runValidators: true, new: true }
    )

      .then(user => {
        if (!user) {
          next();
        } else res.send({ message: messages.users.userUpdated, data: user });
      })
      .catch(next);
  },
  updateAvatar: (req, res, next) => {
    User.findByIdAndUpdate(
      req.user._id,
      { avatar: req.body.avatar },
      { runValidators: true, new: true }
    )
      .then(user => {
        if (!user) {
          next();
        } else res.send({ message: messages.users.avatarUpdated, data: user });
      })
      .catch(next);
  }
};
