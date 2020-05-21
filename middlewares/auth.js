const jwt = require('jsonwebtoken');
const config = require('../config');
const AuthError = require('../errors/authError');
const { usersRes } = require('../libs/messages');

module.exports = (req, res, next) => {
  const { jwt: token } = req.cookies;
  if (!token) {
    throw new AuthError(usersRes.needAuth);
  }
  let payload;
  try {
    payload = jwt.verify(token, config.JWT_SECRET);
  } catch (err) {
    throw new AuthError(usersRes.needAuth);
  }
  req.user = payload;
  return next();
};
