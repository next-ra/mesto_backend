const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const { messages } = require('../libs/messages');
const TooShort = require('../libs/tooShort');

module.exports = {
  createUser: (req, res, next) => {
    if (req.body.password.length < 8) {
      throw new TooShort(messages.users.tooShortPass);
    } else
      bcrypt
        .hash(req.body.password, 10)
        .then(hash =>
          User.create({
            name: req.body.name,
            about: req.body.about,
            avatar: req.body.avatar,
            email: req.body.email,
            password: hash
          })
        )
        .then(user =>
          res.status(201).send({
            message: messages.users.userCreated,
            _id: user._id,
            name: user.name,
            email: user.email
          })
        )
        .catch(next);
  },
  login: (req, res, next) => {
    const { email, password } = req.body;
    return User.findUserByCredentials(email, password)
      .then(user => {
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
          {
            expiresIn: '7d'
          }
        );
        res.cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
          sameSite: true
        });
        res.status(200).send({ message: messages.users.login });
      })
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
      .then(user => {
        if (!user) {
          next();
        } else res.json({ data: user });
      })
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
