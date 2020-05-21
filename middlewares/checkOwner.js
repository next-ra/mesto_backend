const BadRequest = require('../libs/badRequest');
const { cardsRes } = require('../libs/messages');

module.exports.checkOwner = (req, res, next) => {
  if (req.user._id !== String(req.card.owner)) {
    throw new BadRequest(cardsRes.cardFailDelete);
  } else next();
};
