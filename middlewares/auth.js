const jwt = require('jsonwebtoken');
const { error401 } = require('../middlewares/errors');

const { NODE_ENV, JWT_SECRET } = process.env;
module.exports = (req, res, next) => {
  const { jwt: token } = req.cookies;
  if (!token) {
    return error401(res);
  }
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'
    );
  } catch (err) {
    return error401(res);
  }

  req.user = payload;

  return next();
};
