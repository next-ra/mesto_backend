const Forbidden = require('../errors/forbidden');
const { cardsRes } = require('../libs/messages');

module.exports.checkOwner = (req, res, next) => {
  if (req.user._id !== String(req.card.owner)) {
    throw new Forbidden(cardsRes.cardFailDelete);
  } else next();
};
