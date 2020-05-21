const jwt = require('jsonwebtoken');
const config = require('../config');
const AuthRequired = require('../errors/authRequired');
const { usersRes } = require('../libs/messages');

module.exports = (req, res, next) => {
  const { jwt: token } = req.cookies;
  if (!token) {
    throw new AuthRequired(usersRes.needAuth);
  }
  let payload;
  try {
    payload = jwt.verify(token, config.JWT_SECRET);
  } catch (err) {
    throw new AuthRequired(usersRes.needAuth);
  }
  req.user = payload;
  return next();
};
