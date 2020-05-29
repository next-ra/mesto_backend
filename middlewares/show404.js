const NotFound = require('../errors/notFound');
const { othersRes } = require('../libs/messages');

module.exports.show404 = (req, res, next) => {
  next(new NotFound(othersRes.notFound));
};
