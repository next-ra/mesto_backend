const { isCelebrate } = require('celebrate');
const BadRequest = require('../errors/badRequest');

module.exports.celebrateErrorHandler = (err, req, res, next) => {
  if (isCelebrate(err)) {
    throw new BadRequest(err.message);
  }

  return next(err);
};
