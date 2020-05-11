const jwt = require('jsonwebtoken');
const { error401 } = require('../middlewares/errors');
const config = require('../config');

module.exports = (req, res, next) => {
  const { jwt: token } = req.cookies;
  if (!token) {
    return error401(res);
  }
  let payload;
  try {
    payload = jwt.verify(token, config.JWT_SECRET);
  } catch (err) {
    return error401(res);
  }
  req.user = payload;
  return next();
};
