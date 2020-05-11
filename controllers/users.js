const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const config = require('../config');
const { messages } = require('../libs/messages');
const TooShort = require('../libs/tooShort');

const createUser = (req, res, next) => {
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
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then(user => {
      const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
        expiresIn: '7d'
      });
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: true
      });
      res.status(200).send({ message: messages.users.login });
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then(users => {
      if (users.length === 0) {
        res.send({ message: messages.users.emptyDb });
      } else res.send({ data: users });
    })

    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then(user => {
      if (!user) {
        next();
      } else res.json({ data: user });
    })
    .catch(next);
};

const deleteUser = (req, res, next) => {
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
};

const updateUser = (req, res, next) => {
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
};

const updateAvatar = (req, res, next) => {
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
};

module.exports = {
  createUser,
  login,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  updateAvatar
};
